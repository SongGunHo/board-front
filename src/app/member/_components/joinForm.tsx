import React from 'react'
import styled from 'styled-components'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { Input } from '@/app/_global/components/forms'
import { SubmitButton } from '@/app/_global/components/Buttons'
import MessageBox from '@/app/_global/components/MessgeBox'
// 스타일 정의
const StyledForm = styled.form`
  .message {
    margin-bottom: 10px;
  }
`

/**
 * 회원가입 폼 컴포넌트
 *
 * props:
 * - errors   : 검증 실패 시 표시할 오류 메시지 객체
 * - action   : <form> 의 action (서버 액션 함수, ex. processJoin)
 * - pending  : 서버 요청 진행 중 여부 (true면 버튼 비활성화)
 * - onChange : input 값 변경 핸들러
 * - onToggle : 약관 동의 토글 핸들러
 * - form     : 입력값 상태 객체 { email, password, confirmPassword, name, mobile, termsAgree }
 */
const JoinForm = ({ errors, action, pending, onChange, onToggle, form }) => {
  return (
    <StyledForm action={action} autoComplete="off">
      {/* 약관 동의 여부를 hidden 필드로 제출 */}
      <input type="hidden" name="termsAgree" value={form.termsAgree} />

      {/* 이메일 입력 */}
      <Input
        type="text"
        name="email"
        placeholder="이메일을 입력하세요"
        value={form.email}
        onChange={onChange}
      />
      {/* 이메일 오류 메시지 */}
      <MessageBox color="danger">{errors?.email}</MessageBox>

      {/* 비밀번호 입력 */}
      <Input
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요."
        value={form.password}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.password}</MessageBox>

      {/* 비밀번호 확인 입력 */}
      <Input
        type="password"
        name="confirmPassword"
        placeholder="비밀번호를 확인하세요."
        value={form.confirmPassword}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.confirmPassword}</MessageBox>

      {/* 이름 입력 */}
      <Input
        type="text"
        name="name"
        placeholder="회원이름을 입력하세요."
        value={form.name}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.name}</MessageBox>

      {/* 휴대전화번호 입력 */}
      <Input
        type="text"
        name="mobile"
        placeholder="휴대전화번호를 입력하세요."
        value={form.mobile}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.mobile}</MessageBox>

      {/* 약관 동의 영역 */}
      <h3>약관동의</h3>
      <div>약관 동의 작성...</div>
      <div className="terms-agree" onClick={onToggle}>
        {/* 체크박스 아이콘 토글 */}
        {form.termsAgree ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />} 회원가입
        약관에 동의합니다.
      </div>
      <MessageBox color="danger">{errors?.termsAgree}</MessageBox>

      {/* 제출 버튼 (pending 상태면 비활성화) */}
      <SubmitButton type="submit" disabled={pending}>
        가입하기
      </SubmitButton>

      {/* 전역 에러 메시지 (서버 오류 등) */}
      <MessageBox color="danger">{errors?.global}</MessageBox>
    </StyledForm>
  )
}

// React.memo로 불필요한 리렌더링 방지
export default React.memo(JoinForm)
