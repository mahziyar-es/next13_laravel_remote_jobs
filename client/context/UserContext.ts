import { createContext } from 'react';

export const UserContext = createContext<{user?: User, setUser: React.Dispatch<React.SetStateAction<User|undefined>>}>({
    user: undefined,
    setUser: ()=>{},
})