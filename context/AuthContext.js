import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NEXT_URL } from '../config'
import { message } from 'antd';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => checkUserLoggedIn(), [])

  // Register user
  const register = async ({email, password, phone, wallet}) => {
    setLoading(true);
    const res = await fetch(`${NEXT_URL}/api/register`, {
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

    const data = await res.json();

    if(res.ok) {
      message.success('successfully register');
      router.push('/login');
      setLoading(false);
    } else {
      message.error(data.message);
      setError(data.message);
      setLoading(false);
    }
  }
// Login user
  const login = async ({email, password}) => {
    setLoading(true);
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await res.json();

    if(res.ok) {
      router.push('/');
      message.success('successfully login');
      setLoading(false);
    } else {
      message.error(data.message);
      setError(data.message);
      setLoading(false);
    }
  }
// Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    })

    if (res.ok) {
      setUser(null)
      router.push('/login')
    }
  }
// Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      router.push('/login');
      setUser(null);
    }
  }

  const context = { user, error, loading, register, login, logout };
  return (
    <AuthContext.Provider value={context}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext;