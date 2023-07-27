'use client'

import { UserContext } from "@/context/UserContext";
import customFetch from "@/utils/customFetch";
import { Confirm, Gamon, Notify, Sheet } from "gamon-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function HeaderUser({
}: {
}) {

    const router = useRouter()
    const {user, setUser} = useContext(UserContext)
    const [sidebarDisplay, setSidebarDisplay] = useState(false)
     
    const logout = async ()=>{
        Gamon.confirm('Logout', 'Are you sure ?', async ()=>{
            const [res,data] = await customFetch('logout')
            if(!res.ok)return
            setUser(undefined)
            router.push('/register')
        })
    }

    return (
        <>
            {user ?
                <div className="flex items-center relative">
                    <div className="flex items-center cursor-pointer" onClick={()=>setSidebarDisplay(true)}>
                        <span className="hidden md:flex me-2">{user?.name || user?.email}</span>
                        <img src={user?.image} className="w-[30px] h-[30px] rounded-full" />
                    </div>
                    <Sheet  displayModel={[sidebarDisplay, setSidebarDisplay]} type={'right'} bodyClass="h-100 flex flex-col" animation="slide-left">
                        <div className="flex items-center " >
                            <img src={user?.image} className="w-[50px] h-[50px] rounded-full" />
                            <div className="ms-2 text-black">
                                { user?.name ?
                                    <div className="flex flex-col">
                                        <span>{user.name}</span>
                                        <span className="text-sm text-gray-400 mt-2">{user?.email || ''}</span>
                                    </div>
                                    :
                                    user?.email
                                }
                            </div>
                        </div>
                        <div className="mt-4 text-black border-t pt-4 w-full flex-1">
                            <Link onClick={()=>setSidebarDisplay(false)} href="/job/create" className="border-b p-2 w-full flex transition hover:text-theme-2">Post a job</Link>
                            <Link onClick={()=>setSidebarDisplay(false)} href="/jobs?list=posted" className="border-b p-2 w-full flex transition hover:text-theme-2">Posted jobs</Link>
                            <div className="border-b p-2 w-full flex transition hover:text-theme-2 cursor-pointer" onClick={logout}>Logout</div>
                        </div>
                    </Sheet>
                </div>
                :
                <Link className="text-white transition-[0.2s]" href="/register"> Sign In </Link>
            }
        </>
        
    )
}
