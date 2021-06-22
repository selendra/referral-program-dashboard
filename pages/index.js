import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { Table, Tag, Space } from 'antd'

import Header from '../components/Header'
import ShowBalance from '../components/ShowBalance'
import { API_URL } from '../config'
import { parseCookies } from '../helper'

export default function Home({data}) {
  const columns = [
    {
      title: 'Referral ID',
      dataIndex: 'referral_id',
      key: 'referral_id',
      render: (referral_id, record) => {
        return (
          <p style={{wordBreak: 'break-all'}}>
            <Link href={`/details/${record._id}`}>{referral_id}</Link>
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
            <a onClick={() => {navigator.clipboard.writeText(ref), alert(`Copy to clipboard: ${ref}`)}}>Invite Friends/Copy</a>
          </Space>
        )
      },
    },
  ];

  return (
    <div>
      <Head>
        <title>Selendra Referral</title>
        <meta name="description" content="" />
      </Head>
      <Header />
      <Container>
        <HomeContainer>
          <ShowBalance />
          <div style={{padding: '1em 0'}}/>
          <Table columns={columns} dataSource={data} rowKey={record => record._id} />
        </HomeContainer>
      </Container>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  const { token } = parseCookies(req);
  if(!token) {
    res.writeHead(302, { Location: '/login' })
    res.end()
  }

  const response = await fetch(`${API_URL}/referral`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json();

  if(response.status > 400) {
    res.writeHead(302, { Location: '/login' })
    res.end()
  } 

  return {
    props: {
      data: data.data
    }
  }
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e2f3f5;
`
const HomeContainer = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  @media (max-width: 56rem) {
    padding: 0 1em;
  } 
`