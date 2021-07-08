import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Row, Col, Button, Drawer, Avatar } from 'antd'
import styled from 'styled-components'
import AuthContext from '../context/AuthContext'
import selendraHeader from '../assets/selendra-header.png'

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  return (
    <Container>
      <HeaderContainer>
        <Row align='middle' justify='space-between' style={{width: '100%'}}>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <NavLink to='/'>
              <img
                src={selendraHeader}
                alt='selendra'
                width='120'
                height='46'
                style={{cursor: 'pointer'}}
              />
            </NavLink>
          </Col>
          <Col xs={0} sm={0} md={12} lg={12} xl={12}>
            <Row align='middle' justify='end'>
              {user && (
                <NavLink to='/profile'>
                  <Avatar 
                    style={{ backgroundColor: '#f56a00', verticalAlign: 'middle', cursor: 'pointer' }} 
                    size="large"
                  >
                    <ProfileName>{(user.email).charAt(0).toUpperCase()}</ProfileName>
                  </Avatar>
                </NavLink>
              )}
              <ButtonBuy><NavLink to='/get-invite'>Get Referral ID</NavLink></ButtonBuy>
              <ButtonLogout onClick={logout} type='text'>Log Out</ButtonLogout>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={0} lg={0} xl={0}>
            <Row justify='end'>
              <img 
                src='/images/menu.svg'
                alt='selendra'
                width='32'
                height='32'
                style={{cursor: 'pointer'}}
                onClick={() => setVisible(true)}
              />
            </Row>
            <Drawer
              title=""
              onClose={() => setVisible(false)}
              visible={visible}
              closable={false}
              drawerStyle={{background: '#1D3442'}}
            >
              <img
                src='/images/selendra-header.png'
                alt='selendra'
                width='120'
                height='46'
                style={{cursor: 'pointer'}}
              />
              <div style={{margin: '1em 0'}}/>
              {user && <ProfileName>{user.email}</ProfileName>}
              <div style={{margin: '1em 0'}}/>
              <ButtonBuy><NavLink to='/get-invite'>Get Referral ID</NavLink></ButtonBuy>
              <div style={{margin: '1em 0'}}/>
              <ButtonLogout onClick={logout} type='text'>Log Out</ButtonLogout>
            </Drawer>
          </Col>
        </Row>
      </HeaderContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 68px;
  background-color: #1D3442;
`
const HeaderContainer = styled.div`
  max-width: 56rem;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  @media (max-width: 56rem) {
    padding: 0 1em;
  }
`
const ButtonBuy = styled(Button)`
  border: none;
  border-radius: 4px;
  color: #fff;
  background: #03A9F4;
  margin: 0 1em;
  font-weight: 600;
`
const ButtonLogout = styled(Button)`
  color: #D65B09;
  font-weight: 600;
  &:hover {
    color: #b84e07;
  }
`
const ProfileName = styled.p`
  margin: 0 1em;
  color: #F5F5F5;
  font-weight: 600;
`