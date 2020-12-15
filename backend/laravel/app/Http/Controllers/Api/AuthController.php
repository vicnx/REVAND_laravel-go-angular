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
use Illuminate\Support\Facades\Log;

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
        $user = User::find($apy['id']);
        $token3 = JWTAuth::fromUser($user);

        $user = JWTAuth::toUser($token3);
        $user['token'] = $token3;

        error_log("USER AUTH WDOSHJINILDJKNIKOLAWDNDAWDJKLAWD");
        error_log(print_r(auth()->user(),true));
        // $token = auth()->tokenById(1);
        // $user = User::where('id', '=', $apy['id'])->first();
        // $token = JWTAuth::fromUser($user);
        // error_log($token);
        
        // $user1 = JWTAuth::toUser($token);
        // $token = Auth::loginUsingId($apy['id']);
    

        // if (!Auth::once($credentials)) {
        //     return $this->respondFailedLogin();
        // }
        // error_log(auth()->user());
        
        return $this->respondWithTransformer(auth()->user());





        // $user = User::where('id', '=', $apy['id'])->first();
        // // if ($user['type'] == 'admin') {
        // //     $user['token'] = $token2;

        // //     // JWTAuth::fromUser($user);
        // //     Auth::login($user);
        // //     // JWTAuth::setToken($token2);
    
        // //     // error_log(auth()->user());
            
        // //     error_log(auth()->user());
        // //     return $this->respondWithTransformer(auth()->user());
        // // } else {
        // //     return response()->json(false);
        // // }
        // $user['token'] = $token2;

        // // JWTAuth::fromUser($user);
        // Auth::login($user);
        // // JWTAuth::setToken($token2);

        // // error_log(auth()->user());
        
        // error_log(auth()->user());
        // return $this->respondWithTransformer(auth()->user());
        // // if (!$userToken = JWTAuth::fromUser($user)) {
        // //     return response()->json(['error' => 'invalid_credentials'], 401);
        // // }
        
        // // JWTAuth::setToken($raw_token);
        // // Redis::set('user_TEST4','joelesgay');
        // // return response()->json(auth()->user());
        // // return $this->respondWithTransformer(auth()->user());

        // // $token_jwt = JWTAuth::getToken();
        // // $decode = JWTAuth::decode($token_jwt);
        // // return response()->json($token);
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
