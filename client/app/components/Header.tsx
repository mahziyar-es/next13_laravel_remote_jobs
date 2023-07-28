'use client'

import { UserContext } from "@/context/UserContext";
import { Confirm, Gamon, Notify, Sheet } from "gamon-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import HeaderUser from "./HeaderUser";

export default function RootLayoutHeader({
}: {
}) {

    const {user, setUser} = useContext(UserContext)
    const [loaded, setLoaded] = useState(false)

    useEffect(()=>{
        setLoaded(true)
    },[])
  
    return (
        <>
            <div className="w-full h-[50px] md:h-[60px] flex items-center justify-between border-b bg-theme-4 shadow-md p-4">
                <div>
                    <Link className="text-white me-4  transition-[0.2s]" href="/">Home</Link>
                    <Link className="text-white me-4  transition-[0.2s]" href="/jobs">Jobs</Link>
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
