import { error } from "console";
import React from "react";
import styled from "styled-components";

const StyledForm  = styled.form`
`;


const JoinForm =({error, action, pending})=>{
     return (
    <StyledForm  action={action} autoComplete="off">

    </StyledForm>
    )
};

export default React.memo(JoinForm);