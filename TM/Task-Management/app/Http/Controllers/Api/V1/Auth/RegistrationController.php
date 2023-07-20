<?php

namespace App\Http\Controllers\Api\V1\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\{Crypt};
use App\Http\Requests\UserRegisterRequest;

class RegistrationController extends Controller
{
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * @OA\Post(
     *   path="/register",
     *   tags={"Auth"},
     *   summary="Register User",
     *   description="Register User",
     *   operationId="postRegister",
     *      @OA\RequestBody(
     *        @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 type="object",
     *                  @OA\Property(
     *                      property="name",
     *                      example="Test User",
     *                      type="string"
     *                  ),
     *                  @OA\Property(
     *                      property="email",
     *                      example="test@domain.com",
     *                      type="string"
     *                  ),
     *                  @OA\Property(
     *                      property="role",
     *                      example="Developer",
     *                      type="string"
     *                  ),
     *                  @OA\Property(
     *                      property="password",
     *                      example="Password@12345",
     *                      type="string",
     *                  ),
     *                  @OA\Property(
     *                      property="confirm_password",
     *                      example="Password@12345",
     *                      type="string"
     *                  ),
     *              )
     *          ),
     *     ),
     *   @OA\Response(
     *      response=201,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *   @OA\Response(
     *      response=401,
     *       description="Unauthenticated"
     *   ),
     *   @OA\Response(
     *      response=400,
     *      description="Bad Request"
     *   ),
     *   @OA\Response(
     *      response=404,
     *      description="not found"
     *   ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     *  )
    */
    public function postRegister(UserRegisterRequest $request)
    {
        $newUser = $this->user->create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => $request['password'],
            'original_password' => Crypt::encryptString($request['password']),
            'role' => $request['role'],
            'status' => 1
        ]);
        $token = $newUser->createToken(config('app.passport_token'))->accessToken;
        $this->user->find($newUser->id)->update([
            'auth_token' => $token
        ]);
        return response()->json(['status' => true, 'message' => "New user created successfully", 'body' => $newUser]);

    }
}
