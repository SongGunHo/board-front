import type { Metadata } from 'next'
import './globals.css'
import { Cookie } from 'react-router-dom'
import Header from './_global/outlines/Header'
import Footer from './_global/outlines/Footer'
import StyledComponentsRegistry from './registry'
import { getLoggedMember } from './member/services/action'


export const metadata: Metadata = {
  title: '게시판',
  description: '게시판 설명...',
}

export default async function RootLayout({
  children,
}: Readonly<{
  cosnt member =  await getLoggedMember();
  if(!member){
    // 토큰이 만료 되었거나 형식에 문제가 있는 경우 토큰 쿠키에서 제거 
    const Cookie 
  }
}>) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
