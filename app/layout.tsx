import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1a7cc4',
}

export const metadata: Metadata = {
  title: '京铁门儿清 - 北京地铁站内导航',
  description: '一款提供北京地铁站内设施信息的导航助手',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/train-icon-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/train-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/train-icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
