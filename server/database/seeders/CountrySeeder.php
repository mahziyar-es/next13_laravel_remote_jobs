<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Country::truncate();

        
        $countries = json_decode(file_get_contents(resource_path('data/countries.json')), true);

        $data = [];

        foreach($countries as $country){
            $data[] =  [ \C::COL_COUNTRY_NAME => $country['name'] ];
        }

        Country::insert($data);

    }
}
