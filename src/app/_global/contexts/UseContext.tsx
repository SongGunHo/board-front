'use client'
import { setMaxListeners } from "events"
import { ContextType, createContext, useState } from "react"

type UserContextType ={
    states: any
    actions: any
}

const UserContext = createContext<UserContextType>({
    states:{loggedMember: undefined, isLogin: false , isAdmain: false },
    actions: {
        setLoggedMember : undefined,
        setIsLogin: undefined,
        setIsAdmin : undefined,
    }
})
 function UserProvider({children, loggedMember}){
    const [member, setLoggedMember] = useState(loggedMember)
    const [isLogin, setIsLogin] = useState(loggedMember)
    const [isAdmain, setIsAdmin] = useState(false)
    if(isLogin){
        setIsAdmin(loggedMember.authority== 'ADMIN')
    }
    const value ={
        states: {loggedMember: member, isLogin, isAdmain},
        actions: {setLoggedMember,setIsLogin , setIsAdmin}
    }
    return <UserContext.Provider value={}>{children}</UserContext.Provider>
}
const {Consumer: UserConsumer}
export default UserContext