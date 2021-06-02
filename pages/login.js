import Head from 'next/head'
import styled from 'styled-components'  
import Image from 'next/image'
import Link from 'next/link'
import { Form, Input, Button, Row } from 'antd'
import Loading from '../components/Loading'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'

export default function Login() {
  const { login, error, loading } = useContext(AuthContext);

  const handleLogin = (val) => {
    // setLoading(true);
    login({ email: val.email, password: val.password })
  }

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Image 
          src='/images/selendra.png'
          alt='selendra'
          width='140'
          height='120'
        />
        <div style={{paddingTop: '1rem'}} />
        <Form layout='vertical' onFinish={handleLogin}>
          <Form.Item label='Email' name='email'>
            <InputStyled />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <InputStyled type='password' />
          </Form.Item>
          <Form.Item>
            <ButtonStyled htmlType='submit' loading={loading}>Login</ButtonStyled>
          </Form.Item>
        </Form>
        <Row justify='end' style={{width: '100%'}}>
          <p>Not a member?</p> 
          <Link href='/register'>
            <RouteLink>register</RouteLink>
          </Link>
        </Row>
      </LoginContainer>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column; 
  padding: 100px;
  align-items: center;
  background-color: #fff;
  border-radius: 16px;
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