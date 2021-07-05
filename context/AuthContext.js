import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { message } from 'antd'
import { NEXT_URL } from '../config'
import { useContract } from '../utils/useContract'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [symbol, setSymbol] = useState('');

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn()
  }, [])

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
      checkUserLoggedIn();
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
    setLoading(true);
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      router.push('/login');
      setUser(null);
    }
    setLoading(false);
  }

// get user account from metamask
  const getUserAccount = async() => {
    if (window.ethereum) {
      try {
        await ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          if(accounts[0] !== user.wallet) return message.error("Look like it's not an address you register!!")
          setAddress(accounts[0]);
          getBepTokenBalance(accounts[0]);
          // router.push('/');
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      message.error("Metamask extensions not detected!");
    }
  };
// get Contract token balance 
  const getBepTokenBalance = async(fromAddress) => {
    let contract = useContract();
    
    // Get decimal
    let decimal = await contract.methods.decimals().call();
    // Get Symbol
    let symbol = await contract.methods.symbol().call();
    setSymbol(symbol); 

    // if(Cookie.get(`account:${user.email}`)) {
    //   // Get Balance
    //   const data = JSON.parse(Cookie.get(`account:${user.email}`));
    //   let balance = await contract.methods.balanceOf(`0x${data.address}`).call();
    //   setBalance(balance / Math.pow(10,decimal));
    // } else {
      // Get Balance
      let balance = await contract.methods.balanceOf(fromAddress).call();
      setBalance(balance / Math.pow(10,decimal))
    // }
  }

  const context = { 
    user, 
    error, 
    loading, 
    register, 
    login, 
    logout, 
    getUserAccount,
    address,
    balance,
    symbol 
  };
  return (
    <AuthContext.Provider value={context}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext;