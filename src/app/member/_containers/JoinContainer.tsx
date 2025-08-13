'use client'
import React, {useActionState, useCallback , useState} from "react"
import { processJoin } from "../services/action"
import JoinForm from "../_components/JoinForm"

 type FormType ={
    email : string
    password: string
    confirmPassword: string
    name: string
    mobile: string
    termsAgree: boolean
}

const JoinContainer =() => {
    const [error, action, pending] = useActionState<any, any>(processJoin, {})
    const [form, setForm] = useState<FormType>({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      mobile: '',
      termsAgree: false,
    })
    const onChange = useCallback((e)=> {
        setForm((prev)=> ({...prev, [e.target.name]: e.target.vlaue}))
    }, [])
    const onToggle = useCallback(()=>{
        setForm((prev)=>  ({...prev, termsAgree: !prev.termsAgree}))
    }, [])
    return( 
        <JoinForm 
            error={error} action={action} pending={pending} onChange={onChange} onToggle={onToggle} form={form}/>
    )
}// user 훅이다 

export default React.memo(JoinContainer);