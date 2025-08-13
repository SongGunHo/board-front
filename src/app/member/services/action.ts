'use servicer'
import { redirect } from 'next/navigation'

 //  유저 서버 쪽 담당 ???
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
  
}
