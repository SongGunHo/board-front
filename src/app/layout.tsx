import type { Metadata } from 'next'
import './globals.css'
import Header from './_global/outlines/Header'
import Footer from './_global/outlines/Footer'
import StyledComponentsRegistry from './registry'
import { CommonProvider } from './_global/contexts/CommonContext'
import { getToken } from './_global/libs/utils'
import { UserProvider } from './_global/contexts/UseContext'
import { Redirect } from 'next/dist/lib/load-custom-routes'

export const metadata: Metadata = {
  title: '게시판',
  description: '게시판 설명...',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <CommonProvider>
            <UserProvider
              loggedMember={member}
              token={cookie.get('token')?.value}
            >
              <Header />
              <main className="main-content">{children}</main>
              <Footer />
            </UserProvider>
          </CommonProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
