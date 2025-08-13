import React, { Children } from "react";
import color from "../styles/color";
import MessageType from "@/app/types/MessgeType";
import styled from "styled-components";

const StyledMessge = styled.div`




`;

const MessageBox = ({children, color, message}: MessageType) =>{
    if(children) message = children
    message = Array.isArray(message) ? message : message?[message] : []
    if(message.length === 0)return <></>
        return message.forEach


}
export default React.memo(MessageBox)