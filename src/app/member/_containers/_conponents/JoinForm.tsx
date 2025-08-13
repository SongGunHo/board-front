import { error } from "console";
import React from "react";
import styled from "styled-components";
import { Input } from "@/app/_global/components/forms";
import { IoMdCheckbox} from 'react-icons/io'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'


const StyledForm  = styled.form`
`;


const JoinForm =({error, action, pending})=>{
     return (
       <StyledForm action={action} autoComplete="off">
         <Input type="text" name="email" placeholder="이메일을 입력을 하세요" />
         <Input
           type="password"
           name="password"
           placeholder="비밀 번호를 입력 하세요"
         />
         <Input
           type="password"
           name="confirmPassword"
           placeholder="비밀 번호를 확인 하세요"
         />
         <Input type="text" name="name" placeholder="회원이름을 입력 하세요" />
         <Input
           type="text"
           name="mobile"
           placeholder="전화번호를 입력 하세요"
         />
         <h3>약관 동의 </h3>
         <div className="ter">
           <MdCheckBoxOutlineBlank /> 회원 약관에 동의 합니다 
         </div>
       </StyledForm>
     )
};

export default React.memo(JoinForm);