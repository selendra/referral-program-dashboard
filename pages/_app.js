import { AuthProvider } from '../context/AuthContext'

import '../styles/globals.css'
import 'antd/dist/antd.css'

export default function MyApp({ Component, pageProps }) {
  return(
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}