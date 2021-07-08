import { createContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
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

  // Logout user
  const logout = async () => {
    setUser(null);
    localStorage.setItem("token", "");
    history.push('/login');
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
    logout, 
    getUserAccount,
    checkUserLoggedIn
  };
  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;