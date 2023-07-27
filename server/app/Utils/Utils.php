<?php
namespace App\Utils;
use C;
use Illuminate\Support\Facades\Log;

class Utils {

    public static function uploadFile($file, $path, $width = '', $height = '', $percent = ''){
        $fullname = $file -> getClientOriginalName();
        $justname = pathinfo($fullname, PATHINFO_FILENAME);
        $justext = $file -> getClientOriginalExtension();

        $fileName = $justname.'_'.time().'.'.$justext;
        $file->move($path,$fileName);

        $file1 = $path.'/'.$fileName;
        self::cropImage($file1,  $width , $height , $percent);

        return $fileName;
    }


    // ================================================================
    private static function cropImage($image, $newWidth='', $newHeight='', $percent = ''){

        $extension =  pathinfo($image, PATHINFO_EXTENSION);

        list($width, $height) = getimagesize($image);

        if($newWidth != '' && $newHeight != ''){
            $newHeight = (int)$newHeight;
            $newWidth = (int)$newWidth;
        } elseif($percent != '') {
            $newWidth = $percent * $width;
            $newHeight = $percent * $height;
        } else {
            return;
        };


        $thumb = imagecreatetruecolor($newWidth, $newHeight);

        if($extension == 'jpg' || $extension == 'JPG' || $extension == 'jpeg' || $extension == 'JPEG'){
            $source = imagecreatefromjpeg($image);
            imagecopyresized($thumb, $source, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
            imagejpeg($thumb,$image);
        }
        elseif($extension == 'png' || $extension == 'PNG'){
            $source = imagecreatefrompng($image);
            imagecopyresized($thumb, $source, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
            imagepng($thumb,$image);
        }

    }


    // ======================================================================
    public static function deleteFile($fileAddress, $path){
        $file = pathinfo($fileAddress);
        $filename = $file['basename'];

        if($path[-1] != '/') $path.="/";

        if($filename != "" && $filename != "default.png" && file_exists($path.$filename))
            \unlink($path.$filename);

        return;
    }
}
