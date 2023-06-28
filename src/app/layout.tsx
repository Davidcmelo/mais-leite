import './globals.css'
import { useRouter } from 'next/router';
import { Inter, Rajdhani } from 'next/font/google'
import Header from '@/Components/Header';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] })

 export const rajdhani = Rajdhani({
  weight: ['400' ,'500','600','700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Sistema mais leite',
  description: 'Sistema de controle de leite',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children} </body>
    </html>
  )
}
