import Header from "../components/Header"
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import Cookie from 'js-cookie'
import Web3 from 'web3'
import { useState, useContext, useEffect } from 'react'
import { Button, Row, Input, Modal, Col, message } from 'antd'
import abi from '../contract/abi.json'
import AuthContext from '../context/AuthContext'
import { NEXT_URL } from '../config'
import { PlusOutlined } from '@ant-design/icons' 

export default function GetInvite() {
  const {user, loading} = useContext(AuthContext);
  const contractAddress = '0xd84D89d5C9Df06755b5D591794241d3FD20669Ce';
  const testnet = 'https://data-seed-prebsc-1-s1.binance.org:8545';

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [balance, setBalance] = useState();
  const [symbol, setSymbol] = useState();
  const [password, setPassword] = useState();
  const [cookie, setCookie] = useState();
  const [indicator, setIndicator] = useState(false);
  
  const getBalance = async () => {
    if(cookie) {
      let web3 = new Web3(testnet);
      let contract = new web3.eth.Contract(abi, contractAddress);
      
      // Get decimal
      let decimal = await contract.methods.decimals().call();
  
      // Get Symbol
      let symbol = await contract.methods.symbol().call();
      setSymbol(symbol);
  
      // Get Balance
      const data = JSON.parse(Cookie.get(`account:${user.email}`));
      const address = data.address; 
      let balance = await contract.methods.balanceOf(`0x${address}`).call();
      setBalance(balance / Math.pow(10,decimal));
    }
  }

  const handleConfirm = async () => {
    if(!cookie) return message.error("Please import your Account!");
    setIndicator(true);
    const data = JSON.parse(Cookie.get(`account:${user.email}`));
    const res = await fetch(`${NEXT_URL}/api/get-invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keystore: data,
        password
      })
    })

    const resData = await res.json();

    if(res.ok) {
      console.log(resData.data.data)
    } else {
      message.error(resData.message)
    }
  }

  useEffect(() => {
    if(!loading && user){ 
      getBalance();
      setCookie(Cookie.get(`account:${user.email}`));
    }
  },[loading])

  return (
    <div>
      <Head>
        <title>Selendra Referral</title>
        <meta name="description" content="" />
      </Head>
      <Header />
      <Container>
        <HomeContainer>
          <div style={{padding: '1em 0'}}/>
          <Row justify='end'>
            { cookie ? 
              (
                <Balance>Balance: <BalanceHG>{balance} {symbol}</BalanceHG></Balance>
              ):(
                <Link href='/importaccount'>
                  <ButtonBuy style={{marginBottom: '1em'}} icon={<PlusOutlined />}>Import Account</ButtonBuy>
                </Link>
              )
            }
          </Row>
          <Row>
            <RefItem>
              <Row align='middle' justify='space-around' style={{height: '100%'}}>
                <Col>
                  <Text>1 Referral link</Text>
                </Col>
                <Col>
                  <TextPrice>1 SEL</TextPrice>
                </Col>
                <Col>
                  <ButtonBuy type='primary' onClick={() => setIsModalVisible(true)}>Buy</ButtonBuy>
                </Col>
              </Row>
            </RefItem>
          </Row>
          <Modal 
            title="" 
            footer="" 
            visible={isModalVisible} 
            onCancel={() => setIsModalVisible(false)}
          >
            <Title>Confirm</Title>
            <TextLight>Item:</TextLight>
            <SubTitle>1 Referral link</SubTitle>
            <TextLight>Price:</TextLight>
            <SubTitle>1 SEL</SubTitle>
            <Row>
              <ButtonConfirm type='primary' onClick={() => setModalConfirm(true)}>Buy</ButtonConfirm>
              <ButtonCancel onClick={() => setIsModalVisible(false)}>Cancel</ButtonCancel>
            </Row>
          </Modal>
          <Modal
            title=""
            footer=""
            visible={modalConfirm}
            onCancel={() => setModalConfirm(false)}
          >
            <Title>Authorize transaction</Title>
            <label>Password:</label>
            <InputStyled placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <div style={{marginTop: '1em'}} />
            <ButtonConfirm type='primary' onClick={handleConfirm} loading={indicator}>Confirm</ButtonConfirm>
          </Modal>
        </HomeContainer>
      </Container>
    </div>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e2f3f5;
`
const HomeContainer = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  @media (max-width: 56rem) {
    padding: 0 1em;
  } 
`
const Balance = styled.p`
  font-size: 16px;
  font-weight: 600;
`
const BalanceHG = styled.span`
  font-size: 18px;
  color: #D65B09;
  margin-left: 0.4em;
`
const RefItem = styled.div`
  background: #fff;
  height: 70px;
  width: 100%;
  border-radius: 18px;
`
const Text = styled.p`
  margin: 0;
  font-size: 16px;
`
const TextPrice = styled.p`
  margin: 0;
  font-size: 16px;
  color: #D65B09;
`
const ButtonBuy = styled(Button)`
  border-radius: 18px;
  width: 160px;
`
const ButtonConfirm = styled(Button)`
  border-radius: 18px;
  width: 100%;
  height: 46px;
`
const ButtonCancel = styled(Button)`
  width: 100%;
  height: 46px;
  border-radius: 18px;
  margin-top: 1em;
  border: red 1px solid;
  &:hover {
    color: #fff;
    background: red;
    border: red 1px solid;
  }
`
const Title = styled.p`
  font-size: 34px;
  text-align: center;
  font-weight: 900;
`
const SubTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
`
const TextLight = styled.p`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 6px;
`
const InputStyled = styled(Input)`
  width: 100%;
  height: 46px;
  border-radius: 18px;
  border: 1px solid grey;
`