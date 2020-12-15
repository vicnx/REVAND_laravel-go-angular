<?php

namespace App\Http\Controllers\Api;

use App\Models\Award;
use App\Http\Resources\Award as AwardResource;
//import controller from ../
use Auth;

use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UpdateAward;
use App\Http\Requests\Api\DeleteAward;
use App\Resolvers\Transformers\AwardTransformer;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AwardController extends ApiController
{
    public function __construct(AwardTransformer $transformer)
    {
        $this->transformer = $transformer;
        
        
        // $this->middleware('auth.api');
        // $this->middleware('auth.api:optional')->only(['index', 'show']);
        
    }
    
    public function store(Request $request)
    {
        // $user = JWTAuth::parseToken()->authenticate();
        // error_log($request);
        $award = new Award(); 
        //guarda la sub en subscription 
        $award = $award->create([
            'name' => $request->input('award.name'),
            'description' => $request->input('award.description'),
            'image'=> $request->input('award.image')
        ]);
        
        // Pasamos la award al transformer
        return $this->respondWithTransformer($award);
    }

    //SHOW ONE SUB
    public function show(Award $award)
    {      
        return $this->respondWithTransformer($award);
    }

    //SHOW ALL SUBS
    public function index(): JsonResponse
    {        

        /* get all subscriptions ordered by published date */
        $awards = Award::orderBy('id', 'asc')->get();

        /* wrap subscriptions in a resource */
        return AwardResource::collection($awards)->response();
    }

    // public function destroy(DeleteSubscription $request, Subscription $subscription)

    public function destroy(DeleteAward $request, Award $award)
    {
        $award->delete();
        return response()->json(true);
        // return $this->respondSuccess();
    }

    public function update(UpdateAward $request, Award $award)

    // public function update(Subscription $subscription, Request $request)
    {   
        error_log($request);
        if ($request->has('award')) {
            $award->update($request->get('award'));
        }
        // if ($request) {
        //     $subscription->update($request->toArray());
        // }

        return response()->json($award);;
    }
}
