import styled from 'styled-components'
import { Table, Tag, Space } from 'antd'

import Header from '../components/Header'
import ShowBalance from '../components/ShowBalance'
import { API_URL } from '../config'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
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
          <p style={{wordBreak: 'break-all'}}>
            <NavLink to={`/details/${record._id}`}>{referral_id}</NavLink>
          </p>
        )
      }
    },
    {
      title: 'Number Of Use',
      key: 'numberOfUse',
      dataIndex: 'numberOfUse',
      render: (numberOfUse) => 
      {
        let color;
        if(numberOfUse > 3) { color = 'red' } else { color = 'geekblue' }
        
        return (
          <Tag color={color} key={numberOfUse}>
            {numberOfUse}
          </Tag>
        );
      }
    },
    {
      title: 'Action',  
      key: 'action',
      render: (record) => {
        const ref = `https://airdrop.selendra.org/claim-$sel?ref=${record.referral_id}`;
        return(
          <Space size="middle">
            <a href={ref} target="_blank" rel="noreferrer">Invite Friends/Copy</a>
          </Space>
        )
      },
    },
  ];

  return (
    <div>
      <Header />
      <Container>
        <HomeContainer>
          <ShowBalance />
          <div style={{padding: '1em 0'}}/>
          <Table loading={loading} columns={columns} dataSource={data} rowKey={record => record._id} />
        </HomeContainer>
      </Container>
    </div>
  )
}


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e6eeff;
`
const HomeContainer = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  @media (max-width: 56rem) {
    padding: 0 1em;
  } 
`