import { useContext, useState } from 'react'
import { Form, Input, Button, Row } from 'antd'
import styled from 'styled-components' 
import { NavLink } from 'react-router-dom'
import selendra from '../assets/selendra.png'
import AuthContext from '../context/AuthContext'

export default function Login() {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = (val) => {
    setLoading(true);
    login({ 
      email: val.email.toLowerCase(),
      password: val.password
    }).then(_=> setLoading(false))
  }

  return (
    <Container>
      <LoginContainer>
        <img 
          src={selendra}
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
          <NavLink to='/register'>
            <RouteLink>register</RouteLink>
          </NavLink>
        </Row>
      </LoginContainer>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  background-color: #e6eeff;
`
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column; 
  padding: 100px;
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
  height: 50px;
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