<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\TeamRepository;

class TeamManagementController extends Controller
{
    public function __construct(TeamRepository $teamRepository)
    {
        $this->teamRepository = $teamRepository;
    }

    /**
     * @OA\Post(
     *   path="/team/store",
     *   tags={"Team"},
     *   summary="Create team",
     *   description="create new team",
     *   operationId="createTeam",
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
    public function createTeam(Request $request)
    {
        $data = [
            'name' => $request['name'],
            'status' => 1
        ];
        $newTeam = $this->teamRepository->create($data);
        return response()->json(['status' => true, 'message' => "New team created successfully", 'body' => $newTeam]);
    }

    /**
     * @OA\Get(
     ** path="/team/list",
     *   tags={"Team"},
     *   summary="List teams",
     *   description="list all teams",
     *   operationId="listTeam",
     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *)
     */
    public function listTeam()
    {
        $teams = $this->teamRepository->list();
        return response()->json(['status' => true, 'message' => "List all teams", 'body' => $teams]);
    }

    /**
     * @OA\Post(
     *   path="/team/update",
     *   tags={"Team"},
     *   summary="Update team",
     *   description="Update team",
     *   operationId="updateTeam",
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
    public function updateTeam(Request $request)
    {
        $data = [
            'name' => $request['name'],
        ];
        $updateTeam = $this->teamRepository->update('id',$request["id"], $data);
        $updatedTeam = $this->teamRepository->getById($request["id"]);
        return response()->json(['status' => true, 'message' => "Team updated successfully", 'body' => $updatedTeam]);
    }

    /**
     * @OA\Get(
     ** path="/team/delete/{id}",
     *   tags={"Team"},
     *   summary="Delete team",
     *   description="Delete team by id",
     *   operationId="deleteTeam",
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
    public function deleteTeam($id)
    {
        $this->teamRepository->detachUser('id', $id);
        $teams = $this->teamRepository->delete('id', $id);
        return response()->json(['status' => true, 'message' => "Team deleted successfully"]);
    }
}
