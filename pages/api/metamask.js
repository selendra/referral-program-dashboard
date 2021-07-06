import cookie from 'cookie'
import { API_URL } from '../../config'

export default async (req, res) => {
  if(req.method === 'POST') {
    const { txHash } = req.body;

    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const serverRes = await fetch(`${API_URL}/referral/metamask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        txHash
      })
    })

    const data = await serverRes.json();
    
    if(serverRes.ok) {
      res.status(200).json({ data })
    } else {
      res.status(400).json({ message: data.error })
    }
  }
}