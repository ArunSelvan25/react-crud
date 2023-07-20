<?php

namespace App\Repositories;

use App\Models\Project;

class ProjectRepository
{
    public function __construct()
    {
        $this->project = new Project();
    }

    public function create(array $data)
    {
        return $this->project->create($data);
    }

    public function list()
    {
        return $this->project->all();
    }

    public function update($key, $value, array $data)
    {
        return $this->project->where($key, $value)->update($data);
    }

    public function delete($key, $value)
    {
        return $this->project->where($key, $value)->delete();
    }

    public function getById($id)
    {
        return $this->project->where('id', $id)->first();
    }

}