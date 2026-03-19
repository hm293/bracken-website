import type { Metadata } from 'next'
import { Cormorant_Garamond, Lora, Raleway } from 'next/font/google'
import '../globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sacred Sound Sister — Bracken Roots',
  description:
    'Sound-based wellbeing practice by Bracken Roots. Immersive sound baths, corporate wellness, retreats, and bespoke 1:1 sessions.',
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${lora.variable} ${raleway.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
