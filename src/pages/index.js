import styled from 'styled-components'
import { Table, Tag, Space, message } from 'antd'

import Header from '../components/Header'
import ShowBalance from '../components/ShowBalance'
import { API_URL } from '../config'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Facebook } from '../assets/cfacebook.svg';
import { ReactComponent as Twitter } from '../assets/ctwitter.svg';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const onTwitter = (url) => {
    const shareMSG = `Claim $SEL tokens airdrop via ${url}. %23Selendra %23Blockchain %23SmartContract %23OpenSource`;
    window.open(`https://twitter.com/intent/tweet?text=${shareMSG}`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
  }
  const onFacebook = (url) => {
    const shareMSG = `Claim $SEL tokens airdrop via ${url}. %23Selendra %23Blockchain %23SmartContract %23OpenSource`;
    window.open(`http://www.facebook.com/sharer.php?u=http%3A%2F%2F${url}&quote=${shareMSG}`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')
  }

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

  const onCopy = (url) => {
    navigator.clipboard.writeText(url);
    message.success('Copied!');
  }

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
            <p style={{color: '#1890ff', cursor: 'pointer'}} onClick={() => onCopy(ref)}>Invite Friends/Copy</p>
          </Space>
        )
      },
    },
    {
      title: 'Share to social',  
      key: 'action',
      render: (record) => {
        const ref = `airdrop.selendra.org/claim-$sel?ref=${record.referral_id}`;
        return(
          <Space size="middle">
            <Twitter style={{cursor: 'pointer'}} onClick={()=>onTwitter(ref)} />
            <Facebook style={{cursor: 'pointer'}} onClick={()=>onFacebook(ref)} />
          </Space>
        )
      },
    }
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