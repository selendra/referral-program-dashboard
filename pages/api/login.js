import cookie from 'cookie'
import { API_URL } from '../../config'

export default async (req, res) => {
  if(req.method === 'POST') {
    const { email, password } = req.body;

    const serverRes = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await serverRes.json();
    
    if(serverRes.ok) {
      // Set Cookie
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24, // 1 day
          sameSite: 'strict',
          path: '/',
        })
      )
      res.status(200).json({ user: data })
    } else {
      res.status(401).json({ message: data.error })
    }
  }
}
