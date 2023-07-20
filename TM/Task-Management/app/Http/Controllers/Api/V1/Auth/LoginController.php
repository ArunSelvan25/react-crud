<?php

namespace App\Http\Controllers\Api\V1\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Repositories\UserRepository;

class LoginController extends Controller
{

    public $user;
    public $userRepository;

    public function __construct(User $user, UserRepository $userRepository)
    {
        $this->user = $user;
        $this->userRepository = $userRepository;
    }

    /**
     * @OA\Post(
     *   path="/login",
     *   tags={"Auth"},
     *   summary="Login User",
     *   description="Login User",
     *   operationId="postLogin",
     *      @OA\RequestBody(
     *        @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 type="object",
     *                  @OA\Property(
     *                      property="email",
     *                      example="test@domain.com",
     *                      type="string"
     *                  ),
     *                  @OA\Property(
     *                      property="password",
     *                      example="Password@12345",
     *                      type="string",
     *                  ),
     *              )
     *          ),
     *     ),
     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *  )
    */
    public function postLogin(Request $request)
    {
        $authUser = $this->userRepository->getUserByEmail($request['email']);
        if($authUser) {
            if (Hash::check($request['password'], $authUser->password)) {
                $token = $authUser->createToken(config('app.passport_token'))->accessToken;
                $data = [
                    'auth_token' => $token
                ];
                $this->userRepository->updateUser('id',$authUser->id,$data);
                return response()->json(['status' => true, 'message' => "User logged in successfully", 'body' => $token]);
            } else {
                return response()->json(['status' => false, 'message' => "Password is invalid"]);
            }
        } else {
            return response()->json(['status' => false, 'message' => "User does not exists"]);
        }
    }

     /**
     * @OA\Get(
     ** path="/logout",
     *   tags={"Auth"},
     *   summary="User logout",
     *   description="Logout user",
     *   operationId="logout",
     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *)
     */
    public function logout()
    {
        $authId = auth()->user()->id;
        if($authId) {
            $data = [
                'auth_token' => null
            ];
            $this->userRepository->updateUser('id',$authId,$data);
            return response()->json(['status'=>true,'message'=>'Logout successfully']);
        }
        return response()->json(['status'=>false,'message'=>'Please login']);
        
    }
}
