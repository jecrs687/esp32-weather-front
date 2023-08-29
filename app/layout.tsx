import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import getConfig from 'next/config';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Estação Meteorológica',
}
const config = getConfig();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
       {children}

       <div
            style={
                {
                    position: "relative",
                    bottom: "10px",
                    width: "100%",
                    background: "white"
                }
            }
            >
                <center>
                    <small style={{ fontSize: "12px", color: "black" }}>@2023 - {config?.publicRuntimeConfig?.version} Tech-in</small>
                </center>
            </div>
        </body>

    </html>
  )
}
