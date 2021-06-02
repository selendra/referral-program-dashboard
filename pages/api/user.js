import cookie from 'cookie'
import { API_URL } from '../../config/index'

export default async(req, res) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const serverRes = await fetch(`${API_URL}/user/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
    });

    const user = await serverRes.json();

    if (serverRes.ok) {
      res.status(200).json({ user: user.data })
    } else {
      res.status(403).json({ message: 'User forbidden' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}