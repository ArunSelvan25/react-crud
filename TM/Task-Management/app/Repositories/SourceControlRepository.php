<?php

namespace App\Repositories;

use App\Models\SourceControl;

class SourceControlRepository
{
    public $sourceControl;

    public function __construct()
    {
        $this->sourceControl = new SourceControl();
    }

    public function create(array $data)
    {
        return $this->sourceControl->create($data);
    }

    public function list()
    {
        return $this->sourceControl->all();
    }

    public function update($key, $value, array $data)
    {
        return $this->sourceControl->where($key, $value)->update($data);
    }

    public function delete($key, $value)
    {
        return $this->sourceControl->where($key, $value)->delete();
    }

    public function getById($id)
    {
        return $this->sourceControl->where('id', $id)->first();
    }

}