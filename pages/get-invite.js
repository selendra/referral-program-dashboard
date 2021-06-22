import Header from "../components/Header"
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Cookie from 'js-cookie'
import Web3 from 'web3'
import { useState, useContext, useEffect } from 'react'
import { Button, Row, Input, Modal, Col, message } from 'antd'
import AuthContext from '../context/AuthContext'
import { NEXT_URL } from '../config'

import ShowBalance from '../components/ShowBalance'
import { useContract } from "../utils/useContract"
import { useWeb3 } from "../utils/useWeb3"

export default function GetInvite() {
  const router = useRouter();
  const {user, loading, balance, address} = useContext(AuthContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [password, setPassword] = useState();
  const [cookie, setCookie] = useState();
  const [indicator, setIndicator] = useState(false);
  
  const purchaseModal = async() => {
    if(cookie){
      setModalConfirm(true);
    } else {
      const web3 = useWeb3();
      const contract = useContract();

      const recipient = '0x1d95aD53E69Fe58efe777a7490EcF63A2CcbB1De'
      const transaction = contract.methods.transfer(
        recipient,
        web3.utils.toHex(web3.utils.toWei('1', 'ether'))
      );
      
      const options = {
        from: address,
        to      : transaction._parent._address,
        data    : transaction.encodeABI(),
        gas     : "0x" + await transaction.estimateGas({from: address}),
        gasPrice: "0x" + await web3.eth.getGasPrice()
      };
      const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [options],
      })
      try {
        await web3.eth.getTransaction(txHash)
        const res = await fetch(`${NEXT_URL}/api/metamask`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            txHash
          })
        })
        const resData = await res.json();

        if(res.ok) {
          message.success('successfully purchase!')
          router.push('/successfully');
        } else {
          message.error(resData.message);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleConfirm = async () => {
    if(!cookie && !balance) return message.error("Please import your Account!");
    setIndicator(true);
    const data = JSON.stringify(Cookie.get(`account:${user.email}`));
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
      message.success('successfully purchase!')
      router.push('/successfully');
      setIndicator(false);
    } else {
      message.error(resData.message);
      setIndicator(false);
    }
  }

  useEffect(() => {
    if(!loading && user){ 
      setCookie(Cookie.get(`account:${user.email}`));
    }
  },[loading]);

  return (
    <div>
      <Head>
        <title>Selendra Referral</title>
        <meta name="description" content="" />
      </Head>
      <Header />
      <Container>
        <HomeContainer>
          <Row justify='end'>
          </Row>
          <Row justify='end'>
            <ShowBalance />
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
                  <ButtonBuy type='primary' onClick={() => setIsModalVisible(true) }>Purchase</ButtonBuy>
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
              <ButtonConfirm type='primary' onClick={() => purchaseModal()}>Purchase</ButtonConfirm>
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