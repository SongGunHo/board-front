'use server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

/**
 * 회원가입 처리 함수
 *  - formData에서 전달된 값을 추출
 *  - 필수 값 검증
 *  - 비밀번호 일치 여부 확인
 *  - API 서버에 회원가입 요청
 *  - 성공 시 로그인 페이지로 이동
 */
export async function processJoin(errors, formData: FormData) {
  errors = {}
  const params: any = {}

  // FormData에서 key, value 추출
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('$ACTION_')) continue // Next.js 내부 액션 관련 필드 제외

    let _value: string | boolean = value.toString()

    // 'true' / 'false' 문자열을 boolean 값으로 변환
    if (['true', 'false'].includes(_value)) {
      _value = _value === 'true'
    }

    params[key] = _value
  }

  let hasErrors: boolean = false

  // 필수 항목 검증 (비어있으면 오류 메시지 추가)
  const requiredFields = {
    email: '이메일을 입력하세요.',
    password: '비밀번호를 입력하세요.',
    confirmPassword: '비밀번호를 확인하세요.',
    name: '회원이름을 입력하세요.',
    mobile: '휴대전화번호를 입력하세요.',
    termsAgree: '회원가입 약관에 동의하세요.',
  }

  for (const [field, message] of Object.entries(requiredFields)) {
    if (
      !params[field] ||
      (typeof params[field] === 'string' && !params[field].trim())
    ) {
      hasErrors = true
      errors[field] = errors[field] ?? []
      errors[field].push(message)
    }
  }

  // 비밀번호와 비밀번호 확인 일치 여부 체크
  const password = params.password?.trim()
  if (password && password !== params.confirmPassword?.trim()) {
    errors.confirmPassword = errors.confirmPassword ?? []
    errors.confirmPassword.push('비밀번호가 일치하지 않습니다.')
    hasErrors = true
  }

  // 검증 실패 시 오류 메시지 반환 → 화면에서 표시
  if (hasErrors) {
    return errors
  }

  // API 서버에 회원가입 요청
  try {
    const apiUrl = `${process.env.API_URL}/member`
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    // API 서버에서 회원가입 실패 메시지를 내려줄 경우
    if (res.status !== 201) {
      const { messages } = await res.json()
      return messages
    }
  } catch (err: any) {
    // 네트워크 오류 등 예외 발생 시
    return { global: err?.message }
  }

  // 회원가입 성공 → 로그인 페이지로 이동
  redirect('/member/login')
}

/**
 * 로그인 처리 함수
 *  - 이메일, 비밀번호 유효성 검증
 *  - API 서버로 로그인 요청
 *  - 성공 시 JWT 토큰을 쿠키에 저장
 *  - redirectUrl이 있으면 해당 경로로 이동, 없으면 메인(/)으로 이동
 */
export async function processLogin(errors, formData: FormData) {
  errors = {}
  let hasErrors: boolean = false

  // FormData에서 email, password 추출
  const params: { email?: string; password?: string; redirectUrl?: string } = {
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
  }

  // 유효성 검사 - 이메일
  if (!params.email || !params.email.trim()) {
    errors.email = '이메일을 입력하세요.'
    hasErrors = true
  }

  // 유효성 검사 - 비밀번호
  if (!params.password || !params.password.trim()) {
    errors.password = '비밀번호를 입력하세요.'
    hasErrors = true
  }

  if (hasErrors) {
    return errors // 오류 발생 시 메시지 반환
  }

  // 로그인 요청 API 호출
  const apiUrl = `${process.env.API_URL}/member/token`
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (res.status === 200) {
    // 로그인 성공 → 토큰 발급
    const token = await res.text()

    // 토큰을 쿠키에 저장
    const cookie = await cookies()
    cookie.set('token', token, {
      httpOnly: true, // JS에서 접근 불가
      path: '/', // 전체 경로에서 사용 가능
    })
  } else {
    // 로그인 실패 → 서버에서 내려준 메시지 반환
    const json = await res.json()
    return json.messages.global ? json.messages : { global: json.messages }
  }

  // 로그인 성공 시 이동할 경로
  const redirectUrl = formData.get('redirectUrl')?.toString()
  redirect(redirectUrl ? redirectUrl : '/')
}

/**
 * 로그인한 회원 정보 조회 함수
 *  - 쿠키에서 JWT 토큰 꺼내오기
 *  - API 서버에 GET 요청 (Authorization 헤더 포함)
 *  - 성공 시 회원 정보 반환
 */
export async function getLoggedMember() {
  try {
    const cookie = await cookies()
    const token = cookie.get('token')?.value
    if (!token) return // 토큰 없으면 로그인 안된 상태

    const apiUrl = `${process.env.API_URL}/member`
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // JWT 인증 헤더
      },
    })

    if (res.status === 200) {
      return await res.json() // 회원 정보 반환
    }
  } catch (err) {
    console.log('getLoggedMember() error:', err)
  }
}
