import React from "react";
import styled from "styled-components";
import { Input } from "@/app/_global/components/forms";
import { SubmitButton } from "@/app/_global/components/Buttons";
import MessageBox from "@/app/_global/components/MessgeBox";
import { MdPending } from "react-icons/md";

const StyledForm = styled.form`


`;

const LoginForm =({error, action, pending, onChange, form}) =>{
return ( 
    <StyledForm action={action} autoComplete="off">
        <Input type="text" name="email" placeholder="이메일을 입력 하세요" value={form.email} onChange={onChange}/>
        <Input type="password" name="password"placeholder="비밀 번호를 입력 하세요" value={form.password} onChange={onChange}/>
        <SubmitButton type="submit" disable={pending}}>로그인 </SubmitButton>
    </StyledForm>
)

}
export default React.memo(LoginForm)