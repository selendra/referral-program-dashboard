import { useContext, useState } from 'react'
import { Form, Input, Button, Row, message, Col } from 'antd'
import styled from 'styled-components' 
import { NavLink, useHistory } from 'react-router-dom'
import selendra from '../assets/selendra.png'
import { API_URL } from '../config'
import AuthContext from '../context/AuthContext'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import facebook from '../assets/facebook.png';

export default function Login() {
  let history = useHistory();
  const { checkUserLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = async(val) => {
    setLoading(true);
    const res = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: val.email,
        password: val.password
      })
    })

    const data = await res.json();

    if(res.ok) {
      message.success('successfully login');
      localStorage.setItem("token", data.token);
      history.push('/');
      checkUserLoggedIn();
    } else {
      message.error(data.message);
      setLoading(false);
    }
  }

  const responseGoogle = async(response) => {
    const res = await fetch(`${API_URL}/user/googlelogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tokenId: response.tokenId
      })
    })
    const data = await res.json();

    if(res.ok) {
      message.success('successfully login');
      localStorage.setItem("token", data.token);
      history.push('/');
      checkUserLoggedIn();
    } else {
      message.error(data.message);
      setLoading(false);
    }
  }

  const responseFacebook = async(response) => {
    const res = await fetch(`${API_URL}/user/facebooklogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accessToken: response.accessToken,
        userID: response.userID
      })
    })
    const data = await res.json();

    if(res.ok) {
      message.success('successfully login');
      localStorage.setItem("token", data.token);
      history.push('/');
      checkUserLoggedIn();
    } else {
      message.error(data.message);
      setLoading(false);
    }
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
        <Row>
          <Col>
            <GoogleLoginCustomize
              clientId="920463513406-u4gunghahalt1d2liskum7j8ksqsbpfc.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </Col>
          <Col>
            <FacebookLogin
              appId="1154272804982160"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook} 
              render={renderProps => (
                <FacebookLoginCustomize onClick={renderProps.onClick}>
                  <Row align='middle'>
                    <img src={facebook} alt='facebook'/>Login
                  </Row>
                </FacebookLoginCustomize>
              )}
            />
          </Col>
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
  border-radius: 4px;
  width: 240px;
  height: 50px;
`
const ButtonStyled = styled(Button)`
  width: 100%;
  height: 40px;
  border-radius: 4px;
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
const GoogleLoginCustomize = styled(GoogleLogin)`
  height: 40px;
  box-shadow: none!important;
  background-color: whitesmoke!important;
  div {
    background-color: whitesmoke!important;
  }
  span {
    font-weight: 600!important;
  }
`
const FacebookLoginCustomize = styled.button`
  background-color: rgba(24,119,242,1);
  color: #fff;
  font-weight: 600;
  border: none;
  height: 40px;
  padding: 0 10px;
  img {
    width: 24px;
    height: auto;
    margin-right: 18px;
  }
`