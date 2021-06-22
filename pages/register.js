import Head from 'next/head'
import styled from 'styled-components'  
import Image from 'next/image'
import Link from 'next/link'
import { Form, Input, Button, Row } from 'antd'
import { API_URL } from '../config'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'

export default function Register() {
  const { register } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleRegister = async(val) => {
    setLoading(true);
    register({
      email: val.email,
      password: val.password,
      phone: val.phone,
      wallet: val.wallet
    }).then(() => {setLoading(false)})
  }

  return (
    <Container>
      <Head>
        <title>Register</title>
      </Head>
      <LoginContainer>
        <Image 
          src='/images/selendra.png'
          alt='selendra'
          width='140'
          height='120'
        />
        <div style={{paddingTop: '1rem'}} />
        <Form layout='vertical' onFinish={handleRegister}>
          <Form.Item label='Email' name='email'>
            <InputStyled />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <InputStyled type='password' />
          </Form.Item>
          <Form.Item label='Phone' name='phone'>
            <InputStyled />
          </Form.Item>
          <Form.Item label='Wallet' name='wallet'>
            <InputStyled />
          </Form.Item>
          <Form.Item>
            <ButtonStyled htmlType='submit' loading={loading}>Register</ButtonStyled>
          </Form.Item>
        </Form>
        <Row justify='end' style={{width: '100%'}}>
          <p>Already a member?</p> 
          <Link href='/login'>
            <RouteLink>Login</RouteLink>
          </Link>
        </Row>
      </LoginContainer>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  background-color: whitesmoke;
`
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column; 
  padding: 60px;
  align-items: center;
  background-color: #fff;
  border-radius: 16px;
  @media (max-width: 500px) {
    padding: 20px;
  }
`
const InputStyled = styled(Input)`
  border-radius: 16px;
  width: 240px;
  height: 40px;
`
const ButtonStyled = styled(Button)`
  width: 100%;
  height: 40px;
  border-radius: 16px;
  border-color: #03A9F4;
  background-color: #03A9F4;
  color: #f5f5f5;
`
const RouteLink = styled.p`
  color: #03A9F4;
  font-weight: 600;
  margin-left: 6px;
  cursor: pointer;
  &:hover {
    color: #4609D6;
  }
`