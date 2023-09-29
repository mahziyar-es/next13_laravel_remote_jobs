import {  useEffect } from "react";
import { Metadata } from "next";
import HomeBrowseAndRegisterButtons from "./components/HomeBrowseAndRegisterButtons";

import LandingCategoriesSection from "./components/LandingCategoriesSection";
import LandingFeaturesSection from "./components/LandingFeaturesSection";
import LandingHeaderSection from "./components/LandingHeaderSection";


export const metadata: Metadata = {
    title: 'Remote Job Hunt | Home',
    description: 'Remote Job Hunt',
}

export default function Home() {


    return (
        // <div className="h-full overflow-auto bg-landing md:bg-landing-md" >
        <div className="h-full overflow-auto " >

            <LandingHeaderSection />

            <LandingFeaturesSection />

            <LandingCategoriesSection />

        </div>
    )
}
