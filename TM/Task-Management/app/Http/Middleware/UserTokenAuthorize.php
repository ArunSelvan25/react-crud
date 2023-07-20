<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Log;

class UserTokenAuthorize
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Log::info('$request', $request->header());
        $key = !empty($request->header('Authorization')) ? str_replace(["Bearer "," "], "", $request->header('Authorization')) : "";
        $user = new UserRepository();
        $user = $user->checkApiKey($key);

        if(!empty($user))
        {
            return $next($request);
        }else{
            return response()->json(['status'=>false, 'message'=>'Auth token could not be verified.'],401);
        }

        return $next($request);
    }
}
