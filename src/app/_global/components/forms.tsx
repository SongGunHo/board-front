'use client'
import styled , {css} from "styled-components"
import color from "../styles/color"

import fontsize from "../styles/fontsize"


const { dark, light} = color
const {medium} = fontsize
const commonStyled = css`
  color: ${dark};
  border : 1px solid ${light};
  padding: 10px;
  border-radius: 3px;
  width: 100px; 
  &:hover , 
  &:focus {
        border-color: ${dark};
    }
&+& 


`
type CommonType= {
    children: React.ReactNode;
    width?: number
    height?: number
}

export const Input = styled.input`
  ${commonStyled}
  height: 50px;
  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
  ${({ height }) =>
    height &&
    css`
      width: ${height}px;
    `}
`
export const Textarea  = styled.textarea`
    ${commonStyled};
    height: 15px;
`;