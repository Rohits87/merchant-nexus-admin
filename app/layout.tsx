import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PaymentHub Admin Portal',
  description: 'Payment Service Provider Admin Portal - Manage merchants, gateways, and transactions',
  authors: [{ name: 'PaymentHub Team' }],
  keywords: ['payment', 'admin', 'merchant', 'gateway', 'fintech'],
  openGraph: {
    title: 'PaymentHub Admin Portal',
    description: 'Payment Service Provider Admin Portal',
    type: 'website',
    images: ['https://lovable.dev/opengraph-image-p98pqg.png'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@paymenthub',
    images: ['https://lovable.dev/opengraph-image-p98pqg.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}