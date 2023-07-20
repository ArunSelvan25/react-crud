<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\ProjectRepository;
use App\Http\Requests\ProjectCreateRequest;
use Illuminate\Support\Facades\Log;
use App\Models\Project;

class ProjectManagementController extends Controller
{
    public $projectRepository;

    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

    /**
     * @OA\Post(
     *   path="/project/store",
     *   tags={"Project"},
     *   summary="Create project",
     *   description="create new project",
     *   operationId="createProject",
     *      @OA\RequestBody(
     *        @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 type="object",
     *                  @OA\Property(
     *                      property="name",
     *                      example="NotifyNow",
     *                      type="string"
     *                  ),
     *              )
     *          ),
     *     ),
     *  @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *  )
    */
    public function createProject(ProjectCreateRequest $request)
    {
        $data = [
            'name' => $request['name'],
            'status' => 1
        ];
        Log::info('$data', $data);
        $newProject = $this->projectRepository->create($data);
        $projects = $this->projectRepository->list();
        return response()->json(['status' => true, 'message' => "New project created successfully", 'body' => $newProject]);
    }

    /**
     * @OA\Get(
     ** path="/project/list",
     *   tags={"Project"},
     *   summary="List projects",
     *   description="list all projects",
     *   operationId="listProject",
     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *)
     */
    public function listProject()
    {
        $projects = $this->projectRepository->list();
        return response()->json(['status' => true, 'message' => "List all projects", 'body' => $projects]);
    }

    /**
     * @OA\Post(
     *   path="/project/update",
     *   tags={"Project"},
     *   summary="Update project",
     *   description="Update project",
     *   operationId="updateProject",
     *      @OA\RequestBody(
     *        @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 type="object",
     *                  @OA\Property(
     *                      property="name",
     *                      example="PHP",
     *                      type="string"
     *                  ),
     *                  @OA\Property(
     *                      property="id",
     *                      example="1",
     *                      type="string"
     *                  ),
     *              )
     *          ),
     *     ),
     *  @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *  )
    */
    public function updateProject(Request $request)
    {
        $data = [
            'name' => $request['name'],
        ];
        $updateProject = $this->projectRepository->update('id',$request["id"], $data);
        $updatedProject = $this->projectRepository->getById($request["id"]);
        return response()->json(['status' => true, 'message' => "Project updated successfully", 'body' => $updatedProject]);
    }

    /**
     * @OA\Get(
     ** path="/project/delete/{id}",
     *   tags={"Project"},
     *   summary="Delete project",
     *   description="Delete project by id",
     *   operationId="deleteProject",
     *   @OA\Parameter(
     *      name="id",
     *      in="path",
     *      required=true,
     *      description="{Need to pass id as parameter}",
     *      @OA\Schema(
     *          type="string"
     *      )
     *   ),
     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *)
     */
    public function deleteProject($id)
    {
        $this->projectRepository->delete('id', $id);
        return response()->json(['status' => true, 'message' => "Team deleted successfully"]);
    }
}
