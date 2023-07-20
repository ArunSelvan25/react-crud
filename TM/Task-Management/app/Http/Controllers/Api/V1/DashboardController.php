<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    /**
     * @OA\Get(
     ** path="/dashboard",
     *   tags={"Dashboard"},
     *   summary="User Dashboard",
     *   description="Logged in user dashboard",
     *   operationId="dashboard",
     *   @OA\Response(
     *      response=201,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *)
     */
    public function dashboard()
    {
        return response()->json(['status' => true, 'message' => "User dashboard"]);
    }
}
