'use client'
import Link from "next/link";
import { Button, Gamon, InputBasic, InputToggle, Loading } from 'gamon-react'
import { FaGoogle } from "react-icons/fa";
import { useContext, useState } from "react";
import customFetch from "@/utils/customFetch";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";


export default function Register() {    

    const router = useRouter()
    const {setUser} = useContext(UserContext)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const [googleAuthLoading, setGoogleAuthLoading] = useState(false)


    const loginUsingCredentials = async ()=>{

        if(!email){
            Gamon.notify('Enter your email', 'error')
            return
        }
        if(!password){
            Gamon.notify('Enter your password', 'error')
            return
        }

        setLoading(true)

        const [csrfRes, csrfData] = await customFetch('sanctum/csrf-cookie', {
            use_base_url:true,
        })
        
        const [res, data] = await customFetch('register',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                email: email,
                password: password,
            })
        })
        setLoading(false)
        if(!res.ok) return 
        setEmail(undefined)
        setPassword(undefined)
        setUser(data.user)
        router.replace('/')
    }


    const googleAuth = async ()=>{
        setGoogleAuthLoading(true)
        const [res, data] = await customFetch('oauth/link')
        setGoogleAuthLoading(false)
        if(!res.ok) return 

        window.open(data.link)
    }



    return (
        <div className="h-full flex items-center overflow-auto p-4">
            <div className="m-auto flex flex-col w-full md:w-1/2 lg:w-1/4">
                <div className="flex-1">
                    <div className={["border rounded-md p-2 flex items-center cursor-pointer", process.env.NEXT_PUBLIC_USE_OAUTH == "0" && "disabled"].join(" ")} onClick={googleAuth}>
                        <FaGoogle className="text-3xl" />
                        <span className="ms-4"> Login using google </span>
                        {googleAuthLoading && <Loading className="ms-2"/>}
                    </div>
                    <p className="mt-4 text-center">OR</p>
                    <div className="mt-4">

                        <InputBasic model={[email, setEmail]} placeholder="Email" type="email" className="mt-2 bg-white" />
                        <InputBasic model={[password, setPassword]} placeholder="Password" type="password" className="mt-2 bg-white" />
                        <div className="flex items-center justify-center mt-4">
                            <Button text="Login" className="bg-theme-2" onClick={loginUsingCredentials} loading={loading} />
                        </div>

                        {/* <Link href="/auth/recovery" className="flex w-full text-center justify-center mt-6 text-sm text-theme-4"> Forgot your password? </Link> */}

                    </div>
                </div>
            </div>
        </div>
    )
}
