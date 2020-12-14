<?php

namespace App\Http\Controllers\Api;

use App\Models\Subscription;
use App\Http\Resources\Subscription as SubscriptionResource;
//import controller from ../
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
        
        $this->middleware('auth.api')->except(['index', 'show']);
        $this->middleware('auth.api:optional')->only(['index', 'show']);
        
    }
    
    public function store(Request $request)
    {
        error_log("MAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGN");

        error_log(auth()->user());
        $subscription = new Subscription(); 
        //guarda la sub en subscription 
        $subscription = $subscription->create([
            'name' => $request->input('subscription.name'),
            'price' => $request->input('subscription.price'),
        ]);
        error_log("mango ninoiwsda");
        
        // Pasamos la subscription al transformer
        return $this->respondWithTransformer($subscription);
    }

    //SHOW ONE SUB
    public function show(Subscription $subscription)
    {   
        error_log("====================================");
        error_log(auth()->user());
        return $this->respondWithTransformer($subscription);
    }

    //SHOW ALL SUBS
    public function index(): JsonResponse
    {
        error_log("MAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGNMAGN");

        error_log(auth()->user());
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
