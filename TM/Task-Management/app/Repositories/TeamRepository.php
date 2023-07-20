<?php

namespace App\Repositories;

use App\Models\Team;

class TeamRepository
{
    public function __construct()
    {
        $this->team = new Team();
    }

    public function create(array $data)
    {
        return $this->team->create($data);
    }

    public function list()
    {
        return $this->team->all();
    }

    public function update($key, $value, array $data)
    {
        return $this->team->where($key, $value)->update($data);
    }

    public function delete($key, $value)
    {
        return $this->team->where($key, $value)->delete();
    }

    public function getById($id)
    {
        return $this->team->where('id', $id)->first();
    }

    public function detachUser($key, $value)
    {
        $this->team->where('id',$id)->users()->detach();
    }

}