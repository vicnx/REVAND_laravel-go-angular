<?php

namespace App\Http\Controllers\Api;

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

        if (! Auth::once($credentials)) {
            return $this->respondFailedLogin();
        }
        error_log(auth()->user());
        return $this->respondWithTransformer(auth()->user());
    }

    public function test(Request $request){
        error_log("DENTRO DEL TEST");
        error_log($request);



        $user = Redis::get('user_mango1');

        // JWTAuth::setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NTUyOTYyMjQ0NDQsImZpcnN0bmFtZSI6IlRlc3QgVXNlciIsImlkIjoiYWRtaW5AdGVzdC5pbyIsImlkZW50aXR5X2lkIjoiMmRlNjI2NWUtNThkMy00ZWY5LWEzYjYtYTg5YjAwYTJkZmUzIiwibGFzdG5hbWUiOiJBZG1pbmlzdHJhdG9yIiwib3JpZ19pYXQiOjE0NTUyOTI2MjUsInByb2ZpbGVfaWQiOiI4MDY1ZmNiMi1hNTUyLTQyMGMtOGRhMi1jNmJiNGQ5YWNjYjYifQ.RRfE0okr3Wu6yMb-gd4DVhTYaqHw54F-uY1Nn8HOUXc");

        // $token = JWTAuth::getToken();
        // $decode = JWTAuth::decode($token);
        return response()->json($user);
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
