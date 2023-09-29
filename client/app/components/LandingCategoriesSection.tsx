"use client"

import ImageDesigner from '@/public/landing-category-designer.png'
import ImageDeveloper from '@/public/landing-category-developer.png'
import ImageDevops from '@/public/landing-category-devops.png'
import ImageCustomerService from '@/public/landing-category-customer-service.png'
import ImageWriter from '@/public/landing-category-writer.png'
import Image from 'next/image';
import Link from 'next/link';


const LandingCategoriesSection = ()=>{

    const categories = [
        {name: "developer", text: "Developer", image: ImageDeveloper},
        {name: "designer", text: "Designer", image: ImageDesigner},
        {name: "devops", text: "Devops & Sysadmin", image: ImageDevops},
        {name: "customer_service", text: "Customer Service", image: ImageCustomerService},
        {name: "writing", text: "Writing", image: ImageWriter},
    ];


    return(
        <div className="h-full flex flex-col items-start justify-center p-4">
            <p className="font-black text-3xl lg:text-5xl text-theme-1 text-center w-full mb-4 md:mb-10"> Find A Job According To Your <span className="text-theme-2"> Profession </span> </p>
            <div className="flex flex-wrap w-full items-center content-center">
                {categories.map((category, index)=>  (
                    <div 
                        className={["w-1/2  md:w-1/5 lg:w-1/5 p-4" ].join(" ")}
                        key={index}
                    > 
                        <Link href="/jobs" className="block flex flex-col items-center justify-center p-4 rounded transition cursor-pointer text-center hover:shadow-lg group">
                            <Image alt="category-image" src={category.image} className="transition group-hover:scale-105 w-[90px] md:w-full" />
                            <div className="text-theme-3 font-black text-lg mt-2 md:mt-4 drop-shadow group-hover:text-theme-2 transition">{category.text} </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default LandingCategoriesSection;