import MainLayout from '@/layouts/main'
import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import classNames from 'classnames'

const roboto = Roboto({ weight: ["400", "700"], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Evently - The best event management platform',
  description: 'Evently is the best event management platform for your events.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={classNames(roboto.className, "min-h-screen")}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}
