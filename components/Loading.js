import { FoldingCube } from 'better-react-spinkit'
import Image from 'next/image'

export default function Loading() {
  return (
    <center style={{display: 'grid', placeItems: 'center', height: '100vh'}}>
      <div>
        <Image 
          src='/images/selendra.png'
          alt='selendra'
          width='140'
          height='120'
        />
        <FoldingCube 
          color="#03A9F4"
          size={60}
        />
      </div>
    </center>
  )
}