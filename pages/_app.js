import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { AuthProvider } from '../context/AuthContext'

import '../styles/globals.css'
import 'antd/dist/antd.css'

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function MyApp({ Component, pageProps }) {
  return(
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}