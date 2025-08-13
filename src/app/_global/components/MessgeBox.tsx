import color from "../styles/color";
import MessageType from "@/app/types/MessgeType";
import styled from "styled-components";
import fontsize from "../styles/fontsize";
const {noraml} = fontsize


const StyledMessge = styled.div`
    font-size: ${noraml};
    color : ${({ color: c }) => (c ? color[c] : c)}
    box-shadow: 2px 2px 5px ${({ color: c }) => (c ? color[c] : c)}
    padding: 7px 10px
    text-ailgn:center;
    margin-top: 3px;
    border-radius: 3px
`

const MessageBox = ({children, color, message}: MessageType) =>{
    if(children) message = children
    message = Array.isArray(message) ? message : message?[message] : []
    if(message.length === 0)return <></>

    return message.map((m , i )=>
    <StyledMessge  className="message" key={i + '-' + m} color={color ?? 'primary'}>{m}</StyledMessge> )


}

export default MessageBox