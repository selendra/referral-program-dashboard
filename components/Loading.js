import { FoldingCube } from 'better-react-spinkit'
import styled, { keyframes } from 'styled-components'

export default function Loading() {
  return (
    <center style={{display: 'grid', placeItems: 'center', height: '100vh'}}>
      <Container>
        <img 
          src='/images/selendra.png'
          alt='selendra'
          width='140'
          height='120'
        />
        <FoldingCube 
          color="#03A9F4"
          size={60}
        />
      </Container>
    </center>
  )
}

const loading = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
const Container = styled.div`
  /* animation: ${loading} 1s ease-in infinite alternate; */
  z-index: 10000;
`