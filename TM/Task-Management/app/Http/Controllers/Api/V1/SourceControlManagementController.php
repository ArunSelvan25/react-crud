<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\SourceControlRepository;

class SourceControlManagementController extends Controller
{
    public $sourceControlRepository;

    public function __construct(SourceControlRepository $sourceControlRepository)
    {
        $this->sourceControlRepository = $sourceControlRepository;
    }

    /**
     * @OA\Post(
     *   path="/source-control/store",
     *   tags={"Source Control"},
     *   summary="Create new souce control",
     *   description="create new souce control",
     *   operationId="createSourceControl",
     *      @OA\RequestBody(
     *        @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 type="object",
     *                  @OA\Property(
     *                      property="name",
     *                      example="githuh",
     *                      type="string"
     *                  ),
     *                  @OA\Property(
     *                      property="link",
     *                      example="examplelink.com",
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
    public function createSourceControl(Request $request)
    {
        $data = [
            'name' => $request['name'],
            'link' => $request['link'],
            'status' => 1
        ];
        $newSourceControl = $this->sourceControlRepository->create($data);
        return response()->json(['status' => true, 'message' => "New source control created successfully", 'body' => $newSourceControl]);
    }

    /**
     * @OA\Get(
     ** path="/source-control/list",
     *   tags={"Source Control"},
     *   summary="List source control",
     *   description="list all source control",
     *   operationId="listSourceControl",
     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *)
     */
    public function listSourceControl()
    {
        $sourceControls = $this->sourceControlRepository->list();
        
        return response()->json(['status' => true, 'message' => "List all source controls", 'body' => $sourceControls]);
    }

    /**
     * @OA\Post(
     *   path="/source-control/update",
     *   tags={"Source Control"},
     *   summary="Update source control",
     *   description="Update source control",
     *   operationId="updateSourceControl",
     *      @OA\RequestBody(
     *        @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 type="object",
     *                  @OA\Property(
     *                      property="name",
     *                      example="githuh",
     *                      type="string"
     *                  ),
     *                  @OA\Property(
     *                      property="link",
     *                      example="1",
     *                      type="examplelink.com"
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
    public function updateSourceControl(Request $request)
    {
        $data = [
            'name' => $request['name'],
            'link' => $request['link'],
        ];
        $updateSourceControl = $this->sourceControlRepository->update('id',$request["id"], $data);
        $updatedSourceControl = $this->sourceControlRepository->getById($request["id"]);
        return response()->json(['status' => true, 'message' => "Source control updated successfully", 'body' => $updatedSourceControl]);
    }

    /**
     * @OA\Get(
     ** path="/source-control/delete/{id}",
     *   tags={"Source Control"},
     *   summary="Delete source control",
     *   description="Delete source control by id",
     *   operationId="deleteSourceControl",
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
    public function deleteSourceControl($id)
    {
        $this->sourceControlRepository->delete('id', $id);
        return response()->json(['status' => true, 'message' => "Source control deleted successfully"]);
    }

    /**
     * @OA\Get(
     ** path="/source-control/list/{id}",
     *   tags={"Source Control"},
     *   summary="Get single source control",
     *   description="List single source control by id",
     *   operationId="getSourceControlById",
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
    public function getSourceControlById($id)
    {
        $sourceControl = $this->sourceControlRepository->getById($id);
        return response()->json(['status' => true, 'message' => "List source control", 'body' => $sourceControl]);
    }
}
