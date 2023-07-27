<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Utils\CustomValidator;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use C;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{



    public function register(Request $request){
        if(Auth::guard('web')->check()) return response()->json(['message'=> 'You are logged in'], 400);

        CustomValidator::validate($request,[
            'email'=> 'required|email',
            'password'=> 'required|min:8',
        ]);

        $email = $request->input('email');
        $password = $request->input('password');


        $user = User::where(C::COL_USER_EMAIL, $email)->where(C::COL_USER_TYPE, '!=', C::ENUM_USER_TYPE_ADMIN)->first();

        if($user){
            if(Auth::attempt([ C::COL_USER_EMAIL => $email, C::COL_USER_PASSWORD => $password])){
                return response()->json([
                    'message'=> 'Logged in',
                    'user'=> $user,
                ]);
            }
            return response()->json(['message'=> 'Wrong credentials'], 400);
        }
        else{
            $user = new User();
            $user[C::COL_USER_EMAIL] = $email;
            $user[C::COL_USER_PASSWORD] = Hash::make($password);
            $user[C::COL_USER_IMAGE] = null;
            $user->save();

            Auth::login($user);

            return response()->json([
                'message'=> 'Logged in',
                'user'=> $user,
            ]);
        }
    }



    public function oauthLink(Request $request){
        if(Auth::guard('web')->check()) return response()->json(['message'=> 'You are logged in'], 400);

        $link =  Socialite::driver('google')->stateless()->redirect()->getTargetUrl();
        return response([
            'link'=> $link
        ],200);
    }


    public function oauthCallback(Request $request){
        if(Auth::guard('web')->check()) return response()->json(['message'=> 'You are logged in'], 400);

        try {
            $socialiteUser = Socialite::driver('google')->stateless()->user();
        } catch (ClientException $e) {
            return response(['message' => 'Invalid request'], 422);
        }


        $user = User::firstOrCreate(
            [
                C::COL_USER_EMAIL => $socialiteUser->getEmail(),
                C::COL_USER_TYPE => C::ENUM_USER_TYPE_USER,
            ],
            [
                C::COL_USER_NAME => $socialiteUser->getName(),
                C::COL_USER_IMAGE => $socialiteUser->getAvatar(),
                // 'google_id' => $socialiteUser->getId(),
            ]
        );

        $user = User::find($user[C::COL_USER_ID]);

        Auth::guard('web')->login($user);

        return response()->json([
            'user' => $user,
        ]);
    }


    public function user(Request $request){
        $user = Auth::guard('web')->user();

        return response()->json([
            'user'=> $user,
        ]);
    }


    public function logout(){
        Auth::guard('web')->logout();
        return response()->json([
            'message' => 'Logged out',
        ]);
    }

}
