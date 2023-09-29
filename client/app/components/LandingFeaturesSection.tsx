import Image from "next/image";
import IconRemoteJobs from '@/public/ic-remote-job.png'
import IconCategories from '@/public/ic-categories.png'
import IconEasyToUse from '@/public/ic-easy-to-use.png'


const LandingFeaturesSection = ()=>{

   

    return(
        <div className="h-full bg-gray-100 flex flex-col items-center justify-center p-4">
            <p className="text-3xl lg:text-5xl text-center font-black text-theme-1 mb-4 md:mb-10"> Our Platfrom Has 3 Key <span className="text-theme-2"> Features </span> </p>
            <div className="flex flex-col md:flex-row w-full gap-2">
                <div className="flex flex-col flex-1 items-center justify-center group">
                    <Image src={IconRemoteJobs} alt="remote job icon" className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]" />
                    <p className="text-2xl font-bold mt-2 transition group-hover:text-theme-2 group-hover:drop-shadow-md">Only Remote</p>
                    <p className="mt-2 text-center"> only remote jobs are allowed on this platform </p>
                </div>
                <div className="flex flex-col flex-1 items-center justify-center group">
                    <Image src={IconCategories} alt="remote job icon" className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]" />
                    <p className="text-2xl font-bold mt-2 transition group-hover:text-theme-2 group-hover:drop-shadow-md">Many Skills</p>
                    <p className="mt-2 text-center"> dev jobs, graphic design jobs, customer service and more</p>
                </div>
                <div className="flex flex-col flex-1 items-center justify-center group">
                    <Image src={IconEasyToUse} alt="remote job icon" className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]"  />
                    <p className="text-2xl font-bold mt-2 transition group-hover:text-theme-2 group-hover:drop-shadow-md">Easy To Use</p>
                    <p className="mt-2 text-center">very straight forward for applying and posting a job</p>
                </div>
            </div>
        </div>
    );
}


export default LandingFeaturesSection;