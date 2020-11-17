<?php

namespace App\Http\Controllers\Api;

use App\Models\Subscription;
use App\Http\Resources\Subscription as SubscriptionResource;
//import controller from ../
use App\Http\Controllers\Controller;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function store(Request $request)
    {
        // $subscriptions = new Subscription();  
        
        // //Route::resource('/subscription','SubscriptionController');
        // $subscriptions->create([
        //     'name' => $request->name,
        //     'price' => $request->price,
        // ]);

        // //falta transformer para ver resultado al hacer post
        // return response()->json($subscriptions);

        $subscriptions = new Subscription();

    	$subscriptions->name = $request->name;
        $subscriptions->price = $request->price;
        
        //Route::resource('/subscription','SubscriptionController');
    	$subscriptions->save();

    	return response()->json($subscriptions);
        
    }

    //SHOW ONE SUB
    public function show(Subscription $subscription)
    {
        //Route::resource('/subscription','SubscriptionController');
    	// $subscriptions = Subscription::all();
    	return response()->json($subscription);
    }

    //SHOW ALL SUBS
    public function index(): JsonResponse
    {
        /* get all subscriptions ordered by published date */
        $subscriptions = Subscription::orderBy('id', 'asc')->get();

        /* wrap subscriptions in a resource */
        return SubscriptionResource::collection($subscriptions)->response();
    }

    //DELETE ONE SUBSCRIPTION (falta crear el requests)
    public function destroy(DeleteSubscription $request, Subscription $subscription)
    {
        $subscription->delete();

        return $this->respondSuccess();
    }
}
