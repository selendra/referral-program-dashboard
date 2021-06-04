import { useState, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Web3 from 'web3'
import Cookie from 'js-cookie'
import styled from 'styled-components'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Row, Input, Upload, Col, Switch } from 'antd'
import Header from '../components/Header'
import AuthContext from '../context/AuthContext'

export default function Importaccount() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const testnet = 'https://data-seed-prebsc-1-s1.binance.org:8545';
  const [json, setJson] = useState();
  const [private_key, setPrivate_key] = useState('');
  const [password, setPassword] = useState('');
  const [privateKey, setPrivateKey] = useState(false);

  const beforeUploadJson = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setJson(JSON.parse(reader.result));
      // console.log(JSON.parse(reader.result))
    };
    reader.readAsText(file);
    return false;
  }

  const handleImport = async () => {
    const web3 = new Web3(testnet);
    if(private_key) {
      const keystoreJsonV3 = web3.eth.accounts.encrypt(private_key, password);
      Cookie.set(`account:${user.email}`, JSON.stringify(keystoreJsonV3));
    } else {
      Cookie.set(`account:${user.email}`, JSON.stringify(json));
    }
    router.push('/get-invite');
  }

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
          <Row justify='center'>
            <Col>
              <Row align='middle'>
                <Switch onChange={() => setPrivateKey(!privateKey)} /><SpanText>Private Key</SpanText><br/>
              </Row>
              <Spacing />
              {!privateKey && (
                <Upload maxCount={1} accept="application/json, text/plain" beforeUpload={beforeUploadJson}>
                  <ButtonStyled icon={<UploadOutlined />}>Keystore</ButtonStyled>
                </Upload>
                
              )}
              {privateKey && (
                <>
                  <InputStyled placeholder='private key' value={private_key} onChange={(e) => setPrivate_key(e.target.value)} />
                  <Spacing />
                  <InputStyled placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
                </>
              )}
              <Spacing />
              <ButtonStyled type='primary' onClick={handleImport}>Import Account</ButtonStyled>
            </Col>
          </Row>
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
const InputStyled = styled(Input)`
  border-radius: 16px;
  width: 320px;
  height: 48px;
`
const ButtonStyled = styled(Button)`
  border-radius: 16px;
  width: 320px;
  height: 48px;
`
const Spacing = styled.div`
  padding: 1em 0;
`
const SpanText = styled.span`
  font-weight: 600;
  margin-left: 10px;
`