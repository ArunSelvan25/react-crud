<?php

namespace App\Interfaces;

interface UserRepositoryInterface
{
    public function checkApiKey($token);
    public function getUserByEmail($email);
    public function getUserById($id);
    public function updateUser($key,$value,$data = []);
}