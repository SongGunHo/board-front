import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
/**
 * 로그아웃 구현
 * @param request
 * @returns
 */
export async function GET(request: NextRequest) { // async   비동기 
  const cookie = await cookies()
  cookie.delete('token')

  const redirectUrl =
    request.nextUrl.searchParams.get('redirectUrl') ?? '/member/login'
  redirect(redirectUrl)
}
