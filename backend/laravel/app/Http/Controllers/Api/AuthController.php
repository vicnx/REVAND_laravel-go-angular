<?php

namespace App\Http\Controllers\Api;

use Tymon\JWTAuth\Facades\JWTAuth;
use Auth;
use App\Models\User;
use App\Http\Requests\Api\LoginUser;
use App\Http\Requests\Api\RegisterUser;
use App\Resolvers\Transformers\UserTransformer;
use Illuminate\Support\Facades\Redis;
use Illuminate\Http\Request;

class AuthController extends ApiController
{
    /**
     * AuthController constructor.
     *
     * @param UserTransformer $transformer
     */
    public function __construct(UserTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    /**
     * Login user and return the user if successful.
     *
     * @param LoginUser $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginUser $request)
    {
        error_log('-------------------------------------------');
        error_log('mango: login AuthController');
        // error_log($request);
        $credentials = $request->only('user.email', 'user.password');
        $credentials = $credentials['user'];

        if (!Auth::once($credentials)) {
            return $this->respondFailedLogin();
        }
        error_log(auth()->user());
        return $this->respondWithTransformer(auth()->user());
    }

    public function login_from_redis(Request $request) {
        $raw_token = Redis::get('user_'.$request['username']);
        $token = explode("Token ", $raw_token)[1];

        // Auth::setToken($token);

        // $user = auth()->setToken($token)->user();

        JWTAuth::setToken($token);

        $token2 = JWTAuth::getToken();
        $apy = JWTAuth::getPayload($token2)->toArray();

        $user = User::where('id', '=', $apy['id'])->first();

        $user['token'] = $token2;

        // JWTAuth::fromUser($user);
        Auth::login($user);
        // JWTAuth::setToken($token2);

        // error_log(auth()->user());
        
        error_log(auth()->user());
        return $this->respondWithTransformer(auth()->user());
        // if (!$userToken = JWTAuth::fromUser($user)) {
        //     return response()->json(['error' => 'invalid_credentials'], 401);
        // }
        
        // JWTAuth::setToken($raw_token);
        // Redis::set('user_TEST4','joelesgay');
        // return response()->json(auth()->user());
        // return $this->respondWithTransformer(auth()->user());

        // $token_jwt = JWTAuth::getToken();
        // $decode = JWTAuth::decode($token_jwt);
        // return response()->json($token);
    }

    /**
     * Register a new user and return the user if successful.
     *
     * @param RegisterUser $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterUser $request)
    {
        error_log("----------------------------------------------------------------------------------");
        error_log("MANGO REGISTER");
        $user = User::create([
            'username' => $request->input('user.username'),
            'email' => $request->input('user.email'),
            'password' => $request->input('user.password'),

        ]);
        error_log("----------------------------------------------------------------------------------");
        error_log("----------------------------------------------------------------------------------");

        error_log($user);
        return $this->respondWithTransformer($user);
    }
}
