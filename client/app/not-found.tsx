import Link from "next/link";


const NotFound = ()=>{
    return(
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <div className="flex items-center gap-4">
                <div className="font-bold text-6xl text-theme-2"> 404 </div>
                <div className="w-[2px] h-[50px] bg-theme-2"> </div>
                <div className="font-bold text-3xl text-theme-3"> Page Not Found </div>
            </div>
            <div className="mt-6">
                <Link href="/" className="text-theme-3">Back To Home Page</Link>
            </div>
        </div>  
    );
}

export default NotFound;