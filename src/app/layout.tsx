import type { Metadata } from 'next'
import './globals.css'
import Header from './_global/outlines/Header'
import Footer from './_global/outlines/Footer'
import StyledComponentsRegistry from './registry'

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
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
