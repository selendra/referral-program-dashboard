import { useContext, useState, useEffect } from 'react'
import { Row, Button } from 'antd'
import styled from 'styled-components'
import AuthContext from '../context/AuthContext'
import Cookie from 'js-cookie'
import { useContract } from '../utils/useContract'
import Link from 'next/link'
import { PlusOutlined } from '@ant-design/icons'

export default function ShowBalance() {
  const { balance, symbol, loading, user } = useContext(AuthContext);
  const [cookie, setCookie] = useState(null);
  const [cBalance, setCbalance] = useState();
  const [cSymbol, setCsymbol] = useState();

  const getBalance = async () => {
    if(Cookie.get(`account:${user.email}`)) {
      let contract = useContract();
      
      // Get decimal
      let decimal = await contract.methods.decimals().call();
  
      // Get Symbol
      let symbol = await contract.methods.symbol().call();
      setCsymbol(symbol);
  
      // Get Balance
      const data = JSON.parse(Cookie.get(`account:${user.email}`));
      let balance = await contract.methods.balanceOf(`0x${data.address}`).call();
      setCbalance(balance / Math.pow(10,decimal));
    }
  }

  useEffect(() => {
    if(!loading && user){ 
      setCookie(Cookie.get(`account:${user.email}`));
      getBalance();
    }
  },[loading]);

  return (
    <div style={{padding: '1rem 0'}}>
      <Row justify='end'>
        {(!balance && !cookie) && (
          <Link href='/importaccount'>
            <ButtonImport style={{marginBottom: '1em'}} icon={<PlusOutlined />}>Import Account</ButtonImport>
          </Link>
        )}
        { balance && <Text>Balance: <Balance>{balance}-{symbol}</Balance></Text> }
        { cBalance && <Text>Balance: <Balance>{cBalance}-{cSymbol}</Balance></Text>}
      </Row>
    </div>
  )
}

const Text = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`
const Balance = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #D65B09;
`
const ButtonImport = styled(Button)`
  border-radius: 18px;
  width: 160px;
`