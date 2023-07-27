<?php
namespace App\Utils;

use App\Exceptions\ValidationErrorException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomValidator {

    public static function validate(Request $request, $rules, $messages = []){
        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()){

            $messages = "";
            foreach($validator->errors()->toArray() as $error => $errorMessages){
                $messages.=   implode("/\n",$errorMessages);
            }
            throw new ValidationErrorException($messages);
        }
    }

}
