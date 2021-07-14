import { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Avatar, Row, Col, Input, Button, message } from 'antd'
import { ethers } from 'ethers';
import { useHistory } from 'react-router-dom';

import { API_URL } from '../config'
import Header from '../components/Header'
import AuthContext from '../context/AuthContext'

export default function UpdateProfile() {
  let history = useHistory();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    async function FetchData() {
      const response = await fetch(`${API_URL}/referral`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
    
      if(response.ok) {
        const data = await response.json();
        setData(data.data);
      }
      setLoading(false);
    }
    FetchData();
  }, [])

  const handleUpdate = async(val) => {
    setLoading(true);
    const isEtherAddress = ethers.utils.isAddress(wallet);
    if(!isEtherAddress) {
      setLoading(false);
      return message.error('Look like wallet address not valid!');
    } 

    const res = await fetch(`${API_URL}/user/updateprofile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        phone: phone,
        wallet: wallet
      })
    })

    const data = await res.json()

    if(res.ok) {
      message.success('successfully updated!!');
      history.push('/');
    } else {
      setLoading(false);
      message.error(data.error);
    }
  }

  return (
    <div>
      <Header />
      <Container>
        <HomeContainer>
          {user && (
            <RowCard justify='center'>
              <Col>
                <Row justify='center'>
                  <Avatar
                    style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} 
                    size={{ xs: 24, sm: 32, md: 40, lg: 120, xl: 120, xxl: 120 }}
                  >
                    <ProfileName>{(user.email).charAt(0).toUpperCase()}</ProfileName>
                  </Avatar>
                </Row>
                <ProfileItem><ProfileTitle>Email:</ProfileTitle>{user.email}</ProfileItem>
                <ProfileItem><ProfileTitle>Wallet:</ProfileTitle>{user.wallet || <InputStyled value={wallet} onChange={e => setWallet(e.target.value)} />}</ProfileItem>
                <ProfileItem><ProfileTitle>Phone:</ProfileTitle>{user.phone  || <InputStyled value={phone} onChange={e => setPhone(e.target.value)} />}</ProfileItem>
                {(!user.wallet || !user.phone) &&
                  <ButtonStyled loading={loading} onClick={handleUpdate}>Save Change</ButtonStyled>
                }
              </Col>
            </RowCard>
          )}
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
const RowCard = styled(Row)`
  background: #FFF;
  padding: 60px 20px;
  border-radius: 8px;
`
const ProfileName = styled.p`
  margin: 0 1em;
  color: #F5F5F5;
  font-size: 32px;
  font-weight: 600;
`
const ProfileTitle = styled.span`
  font-size: 20px;
  font-weight: 900;
  margin-right: .5em;
`
const ProfileItem = styled.h1`
  font-size: 20px;
  font-weight: 600;
  padding-top: 1rem;
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
  font-weight: 600;
  margin-top: 18px;
`