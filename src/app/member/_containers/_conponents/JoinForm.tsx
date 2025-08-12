import { error } from "console";
import React from "react";
const JoinForm =({error, action, pending});
}) =>{
    return 
    <form  action={action} autoComplete="off">
        <input type="text" name="email" />
        <input type="text" name="password" />
        <button type="submit" disabled={!pending}>가입 하기</button>
    </form>
}

export default React.memo(JoinForm);