import './globals.css'
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/ThemeProvider'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Ayantika Pyne | PM Portfolio — ESG × AI Product Builder",
  description: "Product Manager portfolio: 4 years ESG consulting & systems architecture turned AI-native product builder. Teardowns, PRDs, RAGBench, and live AI assistant.",
  keywords: ["Product Manager", "APM", "AI PM", "ESG Tech", "Climate Tech", "RAGBench", "Product Teardowns", "Ayantika Pyne"],
  authors: [{ name: "Ayantika Pyne" }],
  openGraph: {
    title: "Ayantika Pyne | The Signal, not the Noise",
    description: "ESG data architect turned AI product builder. 10+ products shipped, ₹0 budget constraint.",
    url: "https://ayantika.dev",
    siteName: "Ayantika Pyne Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ayantika Pyne - PM Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayantika Pyne | PM Portfolio",
    description: "ESG data architect turned AI product builder.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased selection:bg-green/20 selection:text-green-dark dark:selection:bg-green-bright/30 dark:selection:text-green-bright">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
