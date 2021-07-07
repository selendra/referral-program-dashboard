import { createContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { message } from 'antd'
import { Contract } from '../utils/useContract'
import { API_URL } from '../config'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [symbol, setSymbol] = useState('');

  let history = useHistory();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // Register user
  const register = async ({email, password, phone, wallet}) => {
    setLoading(true);
    const res = await fetch(`${API_URL}/register`, {
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
      setLoading(false);
      // history.push('/login');
      message.success('successfully register');
    } else {
      setLoading(false);
      message.error(data.message);
    }
  }

  // Login user
  const login = async ({email, password}) => {
    const res = await fetch(`${API_URL}/user/login`, {
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
      // history.push('/');
      checkUserLoggedIn();
      localStorage.setItem("token", data.token);
      message.success('successfully login');
    } else {
      message.error(data.message);
    }
  }
  // Logout user
  const logout = async () => {
    const res = await fetch(`${API_URL}/api/logout`, {
      method: 'POST',
    })
    if(res.ok) {
      setUser(null);
      history.push('/login');
    }
  }
  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${API_URL}/user/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();

    if (res.ok) {
      setUser(data.data);
    } else {
      history.push('/login');
      setUser(null);
    }
  }
  // get user account from metamask
  const getUserAccount = async() => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          if(accounts[0] !== user.wallet) return message.error("Look like it's not an address you register!!")
          setAddress(accounts[0]);
          getBepTokenBalance(accounts[0]);
          history.push('/');
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
    let contract = Contract();
    let decimal = await contract.methods.decimals().call();
    let symbol = await contract.methods.symbol().call();
    let balance = await contract.methods.balanceOf(fromAddress).call();
    setSymbol(symbol);
    setBalance(balance / Math.pow(10, decimal));
  }

  const context = { 
    user, 
    loading, 
    address,
    balance,
    symbol, 
    register, 
    login, 
    logout, 
    getUserAccount,
  };
  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;