'use client'
import React, {useActionState} from "react"
import { processJoin } from "../services/action"
import JoinForm from "./_conponents/JoinForm"

const JoinContainer =() => {
    const [error, action, pending] = useActionState<any, any>(processJoin)
}// user 훅이다 

export default React.memo(JoinContainer);