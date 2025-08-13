'use servicer' //  유저 서버 쪽 담당 ???
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { TbRulerMeasure } from 'react-icons/tb'
import { Cookie } from 'react-router-dom'



/**
 * 회원 가입 처리
 *
 */
export async function processJoin(error,formData: FormData) {
  error =  {}

  const params = {}
  // 필요한 필드와 갑만 추출 
  for (const [key, value ] of formData.entries()){
    if(key.startsWith("$ACTION_")) continue;
    let _value: string | boolean = value.toString();
    if(['true', 'false'].includes(_value)){
      _value = _value === 'true'
    }
    params[key] = _value
  }
  let hasError: boolean = false
  // 필수 항목 검증 s
  const requiredFields ={
    email: '이메일을 입력 하세요',
    password:'비밀 번호를 입력 하새요',
    confirmPassword: '비밀 번호를 다시 입력 하세요',
    name: '이름을 입력 하세요',
    mobile: '전화번호를 입력 하세요',
    termsAgree : '회원 가입 약관에 동의 하세요 ',
  }
  for(const [field, message] of Object.entries(requiredFields)) {
    if (!params[field] ||(typeof params[field] === 'string' && !params[field].trim())
    ) {
      hasErrors = true

      errors[field] = errors[field] ?? []
      errors[field].push(message)
    }
  }
  // 필수 항목 검증 E

  // 비밀번호, 비밀번호 확인 일치 여부
  const password = params.password?.trim()
  if (password && password !== params.confirmPassword?.trim()) {
    errors.confirmPassword = errors.confirmPassword ?? []
    errors.confirmPassword.push('비밀번호가 일치하지 않습니다.')
    hasErrors = true
  }
  // 검증실패시에는 에러 메세지를 출력하기 위한 상태값을 반환 
  if(hasError){
    return error
  }

  // 회원 가입 처리를 위한 api 서버에 요청
  try {
    const apiurl = `${process.env.API_URL}/member`
    const res = await fetch(apiurl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(params),
    }) 
    // API 백엔드에서 검증 실패시 메세지
    if (res.status !== 201) {
      const {message}= await res.json()
      return message
    }
  }catch (err: any){ 
    return {global: [err?.message]}
  }
  // 검증실패시에는 에러 메세지를 출력하기 위한 상태값을 반환 
  if(hasError){
    return error
  }

  //회원 가입 완료시 로그인 페이지로 이동 
  redirect('/member/login')

  console.log('params', params) // async 비동기 
}
/**
 * 로그인 처리 
 * @param errors 
 * @param formData 
 */
export async function processLogin(errors, formData:FormData) {
  errors ={}

  const params: {email :string | undefined, password?: string; redircet} ={
    password: formData.get('password')?.toString(),
  }

  if(!params.email || !params.email.trim()){
    errors.email='이메일을 입력 하새요'
    hasError = true
  }

  if(!params.password || !params.password.trim()){
    errors.password = '비밀 번호를 입력을 하세요'
    hasErrors = true
  }
  // 유효성 검사 E
  // API 백엔드로 요청을 보냄 
  const apiUrl = `${process.env.API_URL}/member/token`
  const res = await fetch(apiUrl, {
    method:   'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(params)

  });
  if(res.status === 2000){ // 로그인 성공 토큰 발급 성공
    const token = await res.text();
    // 로그인 처리 
    const coookie = await cookies()
    cookies.set('token', token, {
      HttpOnly: true,
      path: '/',
    })

  }else { // 로그인 실패 
    const json = await res.json()
    const json.message.global ? json.message : {global: json.message}
  }
  // 로그인 성공시 페이지 이동 redirectUrl 이 있다면 그 주소로 이도 ㅇ아니면 메이페이지로 이동 
  const redirectUrl = formData.get("redirectUrl")?.toString();
  redirect(redirectUrl ? redirectUrl: '/')

  
}
