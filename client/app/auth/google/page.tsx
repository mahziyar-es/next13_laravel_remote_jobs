'use client'
import Link from "next/link";
import { Button, InputBasic, InputToggle, Loading } from 'gamon-react'
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import customFetch from "@/utils/customFetch";
import { UserContext } from "@/context/UserContext";

export default function AuthGoogle() {
    
    const {user, setUser} = useContext(UserContext)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)



    useEffect(()=>{
        login()
    },[])

    const login = async ()=>{

        const [csrfRes, csrfData] = await customFetch('sanctum/csrf-cookie', {
            use_base_url: true,
        })

        const [res, data] = await customFetch(`oauth/callback${window.location.search}`)
        setLoading(false)
        if(!res.ok){
            setError(true)
            return
        }
        setUser(data.user)
    } 



    return (
        <div className="h-full flex items-center overflow-auto p-4">
            <div className="m-auto flex flex-col ">
                { loading ? 
                    
                    (
                        <div className="text-center">
                            <Loading />
                            <p className="text-2xl">Logging in ...</p>
                        </div>
                    )
                    :
                    (
                        error ? 
                        (
                            <div className=" flex flex-col items-center justify-center">
                                <FaTimesCircle className="text-5xl text-red-400" />
                                <p className="mt-4 text-2xl md:text-4xl text-center">Something went wrong during the login process, Please try again</p>
                                <Link href="/register" className="mt-10 p-2 bg-theme-1 text-center rounded-md">Back to register page</Link>
                            </div>
                        )
                        :
                        (
                        <div className="text-center">
                            <div className="flex flex-col items-center justify-center">
                                <FaCheckCircle className="ms-2 text-5xl text-green-400" />
                                <p className="mt-4 text-2xl md:text-4xl">You are Logged In</p>
                                <div className='flex items-center justify-center mt-10 m-auto w-full  animate-fadeInScale'>
                                    <Link href="/jobs" className='rounded-md w-40 m-1 text-center bg-theme-3 text-md p-2 '> Browse Jobs </Link>
                                    <Link href="/job/create" className='rounded-md w-40 m-1 text-center bg-theme-2 text-md p-2 '> Post a job </Link>
                                </div>
                            </div>
                        </div>
                        )
                    )
                }
               
            </div>
        </div>
    )
}
