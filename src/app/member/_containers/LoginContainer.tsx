'use client' // 훅을 사용 하기 위ㅏ해서 
import React, {useActionState , useState , useCallback} from "react"
import { processLogin } from "../services/action"
import LoginForm from "../_components/LoginForm"

type FormType = {
    email: string
    password: string 
}
const LoginContainer =() =>{
    const [error, action, pending] = useActionState <any , any>
    (processLogin ,[])
    const [form , setForm] = useState<FormType>({
        email: '',
        password : '', 
    })

    const onChange = useCallback((e)=>{
        setForm ((prev)=> ({...prev, [e.target.name]: e.target.value}))
    }, [])
    return (
    <LoginForm
    error={error}
    action={action}
    pending={pending}
    form={form}
    onChange={onChange}/>

)
}

export default React.memo(LoginContainer)