<?php

namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function __construct(){
        $this->user = new User();
    }


    /**
     * @param $token
     * @return mixed
     */
    public function checkApiKey($token)
    {
        return $this->user->where('auth_token',$token)->first();
    }

    /**
     * @param $email
     * @return mixed
     */
    public function getUserByEmail($email)
    {
        return $this->user->where('email',$email)->first();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getUserById($id)
    {
        return $this->user->where('id',$id)->first();
    }

    /**
     * @param $key, $value, $data
     * @return mixed
     */
    public function updateUser($key, $value, $data = [])
    {
        return $this->user->where($key,$value)->update($data);
    }

}