import HomeBrowseAndRegisterButtons from "./HomeBrowseAndRegisterButtons";
import LandingHeaderSectionMonitor from "./LandingHeaderSectionMonitor";


const LandingHeaderSection = ()=>{

    return(
        <div className="h-full  flex flex-wrap items-center p-4 content-center">

            <div className="w-full md:w-1/2 mb-10">
                <div className=' animate-slideInRight'>
                    <p className='text-5xl md:text-4xl lg:text-5xl text-theme-1 font-black text-center'>
                        A Place For Fully   
                        <span className="text-theme-2"> Remote </span>
                        Jobs
                    </p>
                    <div className="text-xl lg:text-3xl text-gray-600 mt-10 landing-animated">
                        <p className='text-center'> Find Your Next Job </p>
                        <p className='mt-2 text-center'> Or </p>
                        <p className='mt-2 text-center'> Find Your Next Employee </p>
                    </div>
                </div>
                <HomeBrowseAndRegisterButtons />
            </div>

            <LandingHeaderSectionMonitor />

        </div>
    );
}


export default LandingHeaderSection;