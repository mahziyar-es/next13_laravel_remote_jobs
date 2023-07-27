<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;
use C;


class CountryController extends Controller
{
    

    public function search(Request $request){
        $query = $request->input('query');

        if(!$query) return; 

        $countries = Country::where(C::COL_COUNTRY_NAME, 'LIKE', "%$query%")->limit(10)->get();

        return response([
            'countries'=> $countries,
        ],200);
    }
    

}
