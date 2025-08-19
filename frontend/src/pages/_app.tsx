import type { AppProps } from 'next/app'
import Header from '@/components/layout/Header'
import Body from '@/components/layout/Body'
import Footer from '@/components/layout/Footer'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Header pathname={router.asPath} />
      <Body>
        <Component {...pageProps} />
      </Body>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover theme="light" />
    </div>
  )
}

