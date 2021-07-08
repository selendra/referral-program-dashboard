import styled from 'styled-components'
import { Table } from 'antd'
import { API_URL } from '../../config'
import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export default function Details() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function FetchData() {
      const res = await fetch(`${API_URL}/airdrop/get/userReferred/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if(res.ok) {
        const data = await res.json();
        setData(data.data);
      }
      setLoading(false);
    }
    FetchData();
  }, [id])

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => {
        return (
          <span style={{wordBreak: 'break-all', color: 'blue'}}>{email}</span>
        )
      }
    },
    {
      title: 'Wallet',
      key: 'wallet',
      dataIndex: 'wallet',
      render: (wallet) => {
        return (
          <span style={{wordBreak: 'break-all', color: 'blue'}}>{wallet}</span>
        )
      }
    },
    {
      title: 'Session',
      dataIndex: 'session',
      key: 'session',
      render: (session) => {
        return (
          <span style={{color: 'blue'}}>{session}</span>
        )
      }
    },
  ];

  return (
    <div>
      <Header/>
      <Container>
        <DetailContainer>
          <div style={{padding: '1em 0'}}/>
          <Table loading={loading} columns={columns} dataSource={data} rowKey={record => record._id} />
        </DetailContainer>
      </Container>
    </div>
  )
}

const Container = styled.div`
  min-height: calc(100vh - 68px);
  background-color: #e2f3f5;
`
const DetailContainer = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  @media (max-width: 56rem) {
    padding: 0 1em;
  } 
`