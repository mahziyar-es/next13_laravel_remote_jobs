'use client'

import { UserContext } from "@/context/UserContext";
import { Confirm, Gamon, Notify, Sheet } from "gamon-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import HeaderUser from "./HeaderUser";
import { usePathname } from "next/navigation";

export default function RootLayoutHeader({
}: {
}) {

    const navigationPaths = [
        {path: "/", text: "Home"},
        {path: "/jobs", text: "Jobs"},
    ];
    const [loaded, setLoaded] = useState(false)
    const currentPath = usePathname()


    useEffect(()=>{
        setLoaded(true)
    },[])
  
    return (
        <>
            <div className="w-full h-[50px] lg:h-[60px] flex items-center justify-between border-b bg-theme-4 shadow-md p-4">
                <div>
                    {navigationPaths.map((nav, index)=>(
                        <Link key={index} className={["me-5 transition-[0.2s]", currentPath === nav.path ? 'text-white' : 'text-gray-300' ].join(" ")} href={nav.path}>{ nav.text }</Link>
                    ))}
                </div>
                <div>
                    <HeaderUser />
                </div>
            </div>
            {loaded && 
                <>
                    <div className="gamon-sup-sheet-container">
                        <Notify position='bottom' />
                        <Confirm />
                    </div>
                </>
            }
            
        </>
    )
}
