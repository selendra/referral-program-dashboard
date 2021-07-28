import styled from 'styled-components'
import { Table, Tag, Space, message, Row, Col } from 'antd'

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
          <RefId>
            <NavLink to={`/details/${record._id}`}>{referral_id}</NavLink>
          </RefId>
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
      responsive: ['lg'],
      render: (record) => {
        const ref = `https://airdrop.selendra.org/claim-$sel?ref=${record.referral_id}`;
        return(
          <Space size="middle">
            <RefId style={{color: '#1890ff', cursor: 'pointer'}} onClick={() => onCopy(ref)}>Invite Friends/Copy</RefId>
          </Space>
        )
      },
    },
    {
      title: 'Share to social',  
      key: 'action',
      responsive: ['lg'],
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

  const expandedRow = (data) => {
    const columns = [
      {
        title: 'Action',  
        key: 'action',
        render: (record) => {
          const ref = `https://airdrop.selendra.org/claim-$sel?ref=${record.referral_id}`;
          return(
            <Space size="middle">
              <RefId style={{color: '#1890ff', cursor: 'pointer'}} onClick={() => onCopy(ref)}>Invite Friends/Copy</RefId>
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
    
    return <Table columns={columns} dataSource={[data]} rowKey={record => record._id}  pagination={false} />;
  };

  return (
    <div>
      <Header />
      <Container>
        <HomeContainer>
          <ShowBalance />
          <Row style={{padding: '1em 0'}}>
            <Col xs={24} sm={24} md={24} lg={0} xl={0}>
              <Table 
                loading={loading} 
                columns={columns} 
                dataSource={data} 
                rowKey={record => record._id} 
                expandable={{
                  expandedRowRender: record => expandedRow(record)
                }}
              />
            </Col>
            <Col xs={0} sm={0} md={0} lg={24} xl={24}>
              <Table 
                loading={loading} 
                columns={columns} 
                dataSource={data} 
                rowKey={record => record._id} 
              />
            </Col>
          </Row>
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
const RefId = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 520px) {
    width: 100px;
  } 
`