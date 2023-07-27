import { Gamon } from "gamon-react"
import { getCookie } from "./helpers"


const customFetch = async (uri: string, options?: CustomFetchOptions)=>{


    const requestOptions : CustomFetchOptions = {
        method: options?.method || "GET",
        credentials: 'include',
        headers:{
            'Accept': 'application/json',
            // 'Content-Type': 'application/json; charset=UTF-8',
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
        }
    }

    if(options?.body) requestOptions['body'] = options?.body
    if(options?.headers) requestOptions['headers'] = { ...requestOptions['headers'],  ...options?.headers}

    const res = await fetch(`${options?.use_base_url ? process.env.NEXT_PUBLIC_API_BASE_URL : process.env.NEXT_PUBLIC_API_URL}${uri}`,requestOptions)

    let data
    try{
        data = await res.json();
    }
    catch(err){
        
    }

    if(!res.ok && !options?.disable_error) Gamon.notify(data.message, 'error')
    if(res.ok && data?.message) Gamon.notify(data.message, 'success')

    return [res, data]
}

export default customFetch