import React from 'react'
import styled from 'styled-components'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { Input } from '@/app/_global/components/forms'
import { SubmitButton } from '@/app/_global/components/Buttons'
import MessageBox from '@/app/_global/components/MessgeBox'

const StyledForm = styled.form`
  messge {
    margi-bottom: 10px ;
  }
`

const JoinForm = ({ error, action, pending, onChange, onToggle, form }) => {
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
      <MessageBox color="danger">{error?.email}</MessageBox>

      <Input
        type="password"
        name="password"
        placeholder="비밀 번호를 입력 하세요"
        value={Form.password}
        onChange={onChange}
      />
      <MessageBox color="danger">{error?.password}</MessageBox>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="비밀 번호를 확인 하세요"
        value={Form.confirmPassword}
        onChange={onChange}
      />
      <MessageBox color="danger">{error?.confirmPassword}</MessageBox>
      <Input
        type="text"
        name="name"
        placeholder="회원이름을 입력 하세요"
        value={Form.name}
        onChange={onChange}
      />
      <MessageBox color="danger">{error?.name}</MessageBox>
      <Input
        type="text"
        name="mobile"
        placeholder="전화번호를 입력 하세요"
        value={Form.mobile}
        onChange={onChange}
      />
      <MessageBox color="danger">{error?.mobile}</MessageBox>
      <h3>약관동의</h3>
      <div>약관 동의 작성...</div>
      <div className="terms-agree" onClick={onToggle}>
        {form.termsAgree ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />} 회원가입
        약관에 동의합니다.
      </div>
      <MessageBox color="danger">{error?.termAgree}</MessageBox>
      <SubmitButton type="submit" disable={pending}>
        가입하기
      </SubmitButton>
      <MessageBox color="danger">{error?.global}</MessageBox>
    </StyledForm>
  )
}

export default React.memo(JoinForm)
