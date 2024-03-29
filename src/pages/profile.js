import { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import styled from 'styled-components'
import { Avatar, Row, Col, Table, Tag, Space, Button  } from 'antd'
import Header from '../components/Header'
import { API_URL } from '../config'
import { NavLink } from 'react-router-dom'

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const columns = [
    {
      title: 'Referral ID',
      dataIndex: 'referral_id',
      key: 'referral_id',
      render: (referral_id, record) => {
        return (
          <RefId>
            <NavLink to={`/details/${record._id}`}>{referral_id}</NavLink>
          </RefId>
        )
      }
    },
    {
      title: 'Price',
      key: 'numberOfUse',
      dataIndex: 'numberOfUse',
      render: (numberOfUse) => 
      {
        let color;
        if(numberOfUse > 3) { color = 'red' } else { color = 'geekblue' }
        
        return (
          <Tag color={color} key={numberOfUse}>
            1 SEL
          </Tag>
        );
      }
    },
    {
      title: 'Trx Hash',  
      key: 'action',
      render: (record) => {
        const ref = `https://bscscan.com/tx/${record.transactionHash}`;
        return(
          <Space size="middle">
            <RefId>
              <a href={ref} target='_blank' rel="noreferrer">
                {(record.transactionHash)}
              </a>
            </RefId>
          </Space>
        )
      },
    },
  ];

  return (
    <div>
      <Header />
      <Container>
        <ProfileContainer>
          {user && (
            <div>
              <RowCard justify='center' align='middle'>
                <Col>
                  <Row justify='center'>
                    <Avatar
                      style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} 
                      size={{ xs: 100, sm: 100, md: 100, lg: 120, xl: 220, xxl: 220 }}
                    >
                      <ProfileName>{(user.email).charAt(0).toUpperCase()}</ProfileName>
                    </Avatar>
                  </Row>
                  <ProfileItem>
                    <ProfileTitle>Email</ProfileTitle>{user.email}
                  </ProfileItem>
                  { user.wallet &&
                    <ProfileItem>
                      <ProfileTitle>Wallet</ProfileTitle>{user.wallet}
                    </ProfileItem>
                  }
                  {
                    user.phone &&
                    <ProfileItem>
                      <ProfileTitle>Phone</ProfileTitle>{user.phone}
                    </ProfileItem>
                  }
                  { (!user.wallet || !user.phone) && (
                    <Row justify='center'>
                      <Button type='link'><NavLink to='/updateprofile'>Update Profile</NavLink></Button>
                    </Row>
                  )}
                </Col>
              </RowCard>
              <br/>
              <RowCard justify='center'>
                <Col>
                  <Title>History</Title>
                  <Table loading={loading} columns={columns} dataSource={data} rowKey={record => record._id} />
                </Col>
              </RowCard>
            </div>
          )}
        </ProfileContainer>
      </Container>
    </div>
  )
}

const Container = styled.div`
  min-height: calc(100vh - 68px);
  background-color: #e6eeff;
`
const ProfileContainer = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  padding: 80px 0;
  @media (max-width: 56rem) {
    padding: 0 1em;
  } 
`
const ProfileName = styled.p`
  margin: 0 1em;
  color: #F5F5F5;
  font-size: 80px;
  font-weight: 600;
`
const ProfileTitle = styled.span`
  font-size: 20px;
  font-weight: 900;
  margin-right: .5em;
  display: block;
`
const ProfileItem = styled.h1`
  font-size: 20px;
  font-weight: 600;
  padding-top: 1rem;
  word-break: break-all;
`
const RowCard = styled(Row)`
  background: #FFF;
  padding: 60px 20px;
  border-radius: 8px;
`
const Title = styled.h1`
  font-size: 32px;
  font-weight: 900;
`
const RefId = styled.p`
  word-break: break-all;
  @media (max-width: 520px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100px;
  } 
`