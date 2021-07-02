import Head from 'next/head'
import Link from 'next/link'
import { Button, Row } from 'antd'
import styled from 'styled-components'
import Header from '../components/Header'

export default function Successfully() {
  return (
    <div>
      <Head>
        <title>Selendra Referral</title>
      </Head>
      <Header />
      <Container>
        <HomeContainer>
          <Row justify='center'>
            <img src='/images/congrat.gif' width='280' height='280' />
          </Row>
          <Title>Thank for your purchase!</Title>
          <Text>Your payment was successful, and your purchase is complete.</Text>
          <Row justify='center'>
            <Link href='/'>
              <ButtonStyled type='primary'>Home Page</ButtonStyled>
            </Link>
          </Row>
        </HomeContainer>
      </Container>
    </div>
  )
} 

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`
const HomeContainer = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  @media (max-width: 56rem) {
    padding: 0 1em;
  } 
`
const Title = styled.h2`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
`
const Text = styled.p`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`
const ButtonStyled = styled(Button)`
  width: 280px;
  height: 56px;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: 18px;
`