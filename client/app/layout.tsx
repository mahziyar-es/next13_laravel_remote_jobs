import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import RootLayoutHeader from './components/Header'
import Providers from './components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Remote Job Hunt',
  description: 'Remote Job Hunt',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className='h-screen overflow-hidden flex flex-col'>
                    <Providers>
                        <RootLayoutHeader />
                        <div className='flex-1 overflow-hidden' >
                            {children}
                        </div>
                    </Providers>
                </div>
            </body>
        </html>
    )
}
