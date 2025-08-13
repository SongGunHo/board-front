import { error } from "console";
import React from "react";
import styled from "styled-components";
import { Input } from "@/app/_global/components/forms";
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { SubmitButton } from "@/app/_global/components/Buttons"; // @ 경로
import { Form } from "react-router-dom";


const StyledForm  = styled.form`
`;


const JoinForm =({error, action, pending, onChange, onToggle})=>{
     return (
       <StyledForm action={action} autoComplete="off">
         <Input type="hidden" name="termsAgree" value={Form.termAgree} />

         <Input
           type="text"
           name="email"
           placeholder="이메일을 입력을 하세요"
           value={Form.email}
           onChange={onChange}
         />

         <Input
           type="password"
           name="password"
           placeholder="비밀 번호를 입력 하세요"
           value={Form.password}
           onChange={onChange}
         />
         <Input
           type="password"
           name="confirmPassword"
           placeholder="비밀 번호를 확인 하세요"
           value={Form.confirmPassword}
           onChange={onChange}
         />
         <Input
           type="text"
           name="name"
           placeholder="회원이름을 입력 하세요"
           value={Form.name}
           onChange={onChange}
         />
         <Input
           type="text"
           name="mobile"
           placeholder="전화번호를 입력 하세요"
           value={Form.mobile}
           onChange={onChange}
         />
         <h3>약관동의</h3>
         <div className="terms-agree" onClick={onToggle}>
           {form.termsAgree ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}{' '}
           회원가입 약관에 동의합니다.
         </div>
         <div>약관 동의 작성...</div>
         <SubmitButton type="submit">가입하기</SubmitButton>
       </StyledForm>
     )
};

export default React.memo(JoinForm);