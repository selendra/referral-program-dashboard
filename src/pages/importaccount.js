import { useState, useContext } from 'react'
import Cookie from 'js-cookie'
import styled from 'styled-components'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Row, Input, Upload, Col, Switch, message } from 'antd'
import Header from '../components/Header'
import AuthContext from '../context/AuthContext'
import { Web3Instance } from '../utils/useWeb3'
import { useHistory } from 'react-router-dom';
import {ReactComponent as MetamaskIcon} from '../assets/metamask.svg'

export default function Importaccount() {
  let history = useHistory();
  const { user, getUserAccount } = useContext(AuthContext);
  const [json, setJson] = useState();
  const [private_key, setPrivate_key] = useState('');
  const [password, setPassword] = useState('');
  const [privateKey, setPrivateKey] = useState(false);

  const beforeUploadJson = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setJson(JSON.parse(reader.result));
    };
    reader.readAsText(file);
    return false;
  }

  const handleImport = async () => {
    const web3 = Web3Instance();
    let address;
    if(user.email) {
      if(private_key) {
        const keystoreJsonV3 = web3.eth.accounts.encrypt(private_key, password);
        if((keystoreJsonV3.address).slice(0,2) !== "0x") {
          address = "0x" + keystoreJsonV3.address;
        } else {
          address = keystoreJsonV3.address;
        }
        if(address !== user.wallet) return message.error("Look like it's not an address you register!!");
        Cookie.set(`account:${user.email}`, JSON.stringify(keystoreJsonV3));
      } else {  
        // console.log(json.address, user.wallet)
        if((json.address).slice(0,2) !== "0x") {
          address = "0x" + json.address;
        } else {
          address = json.address;
        }
        if(address !== user.wallet) return message.error("Look like it's not an address you register!!");
        Cookie.set(`account:${user.email}`, JSON.stringify(json));
      }
      history.push('/get-invite');
    }
  }

  return (
    <div>
      <Header />
      <Container>
        <HomeContainer>
          <div style={{padding: '1em 0'}}/>
          <Row justify='center'>
            <Col>
              <Row>
                <ButtonMeta type='primary' onClick={getUserAccount}><Row><MetamaskIcon />Connect with metamask</Row></ButtonMeta>
              </Row><br/>
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
  min-height: calc(100vh - 68px);
  background-color: #e6eeff;
`
const HomeContainer = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  @media (max-width: 56rem) {
    padding: 0 1em;
  } 
`
const InputStyled = styled(Input)`
  border-radius: 4px;
  width: 320px;
  height: 48px;
`
const ButtonStyled = styled(Button)`
  border-radius: 4px;
  width: 320px;
  height: 48px;
  font-weight: 600;
`
const Spacing = styled.div`
  padding: 1em 0;
`
const SpanText = styled.span`
  font-weight: 600;
  margin-left: 10px;
`
const ButtonMeta = styled(Button)`
  border-radius: 4px;
  height: 40px;
  font-weight: 600;
`