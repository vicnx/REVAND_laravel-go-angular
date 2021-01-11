<?php

namespace App\Http\Controllers\Api;

use App\Models\Subscription;
use App\Http\Resources\Subscription as SubscriptionResource;
//import controller from ../
use Auth;

use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UpdateSubscription;
use App\Http\Requests\Api\DeleteSubscription;
use App\Resolvers\Transformers\SubscriptionTransformer;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubscriptionController extends ApiController
{
    public function __construct(SubscriptionTransformer $transformer)
    {
        $this->transformer = $transformer;
        
        
        $this->middleware('auth.api')->only(['store', 'update','destroy']);
        // $this->middleware('auth.api:optional')->only(['index', 'show']);
        
    }
    
    public function store(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        // error_log($request);
        $subscription = new Subscription(); 
        //guarda la sub en subscription 
        $subscription = $subscription->create([
            'name' => $request->input('subscription.name'),
            'price' => $request->input('subscription.price'),
            'admin_id'=> $user->id
        ]);
        
        // Pasamos la subscription al transformer
        return $this->respondWithTransformer($subscription);
    }

    //SHOW ONE SUB
    public function show(Subscription $subscription)
    {      
        return $this->respondWithTransformer($subscription);
    }

    //SHOW ALL SUBS
    public function index(): JsonResponse
    {        
        // $user = JWTAuth::parseToken()->authenticate();
        // $userId = $user->id;
        // error_log($user->token);
        // echo response()->json(auth()->user());

        /* get all subscriptions ordered by published date */
        $subscriptions = Subscription::orderBy('id', 'asc')->get();

        /* wrap subscriptions in a resource */
        return SubscriptionResource::collection($subscriptions)->response();
    }

    //DELETE ONE SUBSCRIPTION (falta crear el requests)
    // public function destroy(DeleteSubscription $request, Subscription $subscription)

    public function destroy(DeleteSubscription $request, Subscription $subscription)
    {
        $subscription->delete();
        return response()->json(true);
        // return $this->respondSuccess();
    }

    public function update(UpdateSubscription $request, Subscription $subscription)

    // public function update(Subscription $subscription, Request $request)
    {   
        if ($request->has('subscription')) {
            $subscription->update($request->get('subscription'));
        }
        // if ($request) {
        //     $subscription->update($request->toArray());
        // }

        return response()->json($subscription);;
    }
}
