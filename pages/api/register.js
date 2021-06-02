import { API_URL } from '../../config'

export default async (req, res) => {
  if(req.method === 'POST') {
    const { email, password, phone, wallet } = req.body;

    const serverRes = await fetch(`${API_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        phone,
        wallet
      })
    })

    const data = await serverRes.json();
    
    if(serverRes.ok) {
      res.status(200).json({ user: data })
    } else {
      res.status(401).json({ message: data.error })
    }
  }
}