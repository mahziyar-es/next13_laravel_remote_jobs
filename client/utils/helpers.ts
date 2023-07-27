import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'

const getCookie = (name:string)=> {
    let cookieValue;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


const getTailwindcssBreakPoint = (breakPoint: "sm"|"md"|"lg"|"xl")=>{
    const fullConfig = resolveConfig(tailwindConfig)
    return Number(fullConfig?.theme?.screens?.['md']?.replace('px', ''))
}

export {
    getCookie,
    getTailwindcssBreakPoint,
}