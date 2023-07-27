'use client'

import { UserContext } from "@/context/UserContext";
import customFetch from "@/utils/customFetch";
import { ReactNode, useEffect, useState } from "react";

export default function Providers({
    children
}: {
    children: ReactNode
}) {

    const [user, setUser] = useState<User>()


    useEffect(()=>{
        fetchUser()
    },[])


    const fetchUser = async ()=>{
        const [res,data] = await customFetch('user',{
            disable_error:true,
        })
        if(res.status == 401) setUser(undefined)
        else setUser(data.user)
    }


    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
