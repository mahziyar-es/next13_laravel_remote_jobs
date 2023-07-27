import {  useEffect } from "react";
import { Metadata } from "next";
import HomeBrowseAndRegisterButtons from "./components/HomeBrowseAndRegisterButtons";

export const metadata: Metadata = {
    title: 'Remote Job Hunt | Home',
    description: 'Remote Job Hunt',
}

export default function Home() {


    // if(typeof window != 'undefined'){
    //     let options = {
    //         root: null,
    //         rootMargin: "0px",
    //         threshold: 0.7,
    //     };
    //     const observer = new IntersectionObserver(entries => {
    //         entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             entry.target.classList.add('scroll-display-animation--show');
    //         }
    //         });
    //     }, options);

    //     const observableElement = document.querySelector('.scroll-display-animation')
    //     if(observableElement) observer.observe(observableElement);
    // }


    return (
        <div className="h-full overflow-auto bg-landing md:bg-landing-md" >

            <div className="h-full  flex items-center">
                <div className="m-auto ">
                    <div className='text-2xl md:text-[50px] animate-slideInRight'>
                        <p className='text-theme-1 font-black'>A place for fully remote jobs</p>
                        <div className="landing-animated">
                            <p className='text-gray-600 mt-10'> Find your next job </p>
                            <p className='text-gray-600 mt-4'> Or </p>
                            <p className='text-gray-600 mt-4'> Find your next employee </p>
                        </div>
                    </div>
                    <HomeBrowseAndRegisterButtons />
                </div>
            </div>

            <div className="h-full bg-gray-200 flex flex-col items-center p-4">
                <div className="m-auto text-xl lg:text-[50px]">
                    <p className='font-black text-theme-1'>Find what you are looking for</p>
                    <p className='text-gray-600 mt-10'>Search among posted jobs and send your application</p>
                    <p className='text-gray-600 mt-6'> Or </p>
                    <p className='text-gray-600 mt-6'>Post a job to find the best employee</p>

                    <div className='mt-10 pt-4  flex flex-warap gap-3'>
                        <div className='w-1/2 lg:w-1/4  p-4 rounded-md shadow-md shadow-theme-4'>
                            <p className='text-3xl lg:text-6xl font-black text-theme-2'> 4500  </p>
                            <div className='text-lg lg:text-xl font-black'>
                                <p className='text-theme-2'>Open Jobs</p>
                                <p className='text-theme-4 '>All remote</p>
                            </div>
                        </div>
                        <div className='w-1/2 lg:w-1/4  p-4 rounded-md shadow-md shadow-theme-4'>
                            <p className='text-3xl lg:text-6xl font-black text-theme-3'> 2300  </p>
                            <div className='text-lg lg:text-xl font-black'>
                                <p className='text-theme-3'>Closed jobs</p>
                                <p className='text-theme-2 '>All found an employee</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>


        </div>
    )
}
