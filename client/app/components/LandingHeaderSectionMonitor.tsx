import Image from "next/image";
import ImageMonitor from '@/public/landing-header-monitor.png'


const LandingHeaderSectionMonitor = ()=>{

    const items = [1, 2, 3, 4];


    const Comp = ()=>{
        return(
            <div  className="shadow-lg border border-theme-3 rounded h-[50px] lg:h-[100px] w-full p-4 text-gray-300 bg-white m-auto hover:text-theme-2 overflow-hidden group">
                <p>-------------------------</p>
                <p>-------</p>
                <button className="h-[15px] w-[40px] text-[10px] border rounded group-hover:bg-theme-1 group-hover:text-white">Apply</button>
            </div>
        )
    }

    return(
        <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center relative">
            <div className="flex flex-col relative h-[110px] w-[200px] lg:h-[220px] lg:w-[350px] top-[25px] overflow-hidden">
                <div className="flex flex-col gap-2 w-full z-10 landing-header-infinite-scroll-animation-section1">
                    {items.map(item=> <Comp />)}
                </div>
                <div className="flex flex-col gap-2 w-full z-10 landing-header-infinite-scroll-animation-section2">
                    {items.map(item=> <Comp />)}
                </div>
            </div>
            <Image alt="landing-header-monitor" src={ImageMonitor}  className="h-[200px] w-[250px] lg:h-[350px] lg:w-[450px] absolute top-[0px]" />
            <p className="absolute top-[-30px] drop-shadow-lg ">New Opportunities Every Day</p>
        </div>

    );
}


export default LandingHeaderSectionMonitor;