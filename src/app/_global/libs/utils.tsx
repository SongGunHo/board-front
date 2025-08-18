'use cilent'
import { cookies } from "next/headers" 

/**
 * token 쿠키값 조회 
 * 
 */
export async function getToken() {
    'use sever'
    const cookie = await cookies()
    
    return cookie.get('token')?.value
}