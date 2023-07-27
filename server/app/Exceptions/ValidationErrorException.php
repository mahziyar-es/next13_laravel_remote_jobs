<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ValidationErrorException extends Exception
{

    protected $message;

    public function __construct(string $message = "") {
        $this->message = $message; 
    }

    /**
     * Render the exception into an HTTP response.
     */
    public function render(): JsonResponse
    {
        return response()->json([
            'message'=> $this->message
        ], 400);
    }
}
