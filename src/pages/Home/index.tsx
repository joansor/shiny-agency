import styled from 'styled-components'
import illustration from '../../assets/home-illustration.svg'

function Home() {
  return (
    <div>
      <ContainerHome></ContainerHome>
      <Illustration src={illustration} alt="illustration" />
      <TextHome>Repérez vos besoins, on s’occupe du reste, avec les meilleurs talents</TextHome>
    </div>
  )
}

const ContainerHome = styled.div`
  background-color: #4f4c6b;
  position: absolute;
  width: 1313px;
  height: 824px;
  left: 65px;
  top: 200px;
`
const Illustration = styled.img`
  position: absolute;
  width: 541px;
  height: 506px;
  left: 760px;
  top: 339px;
`

const TextHome = styled.div`
position: absolute;
width: 552px;
height: 249px;
left: 163px;
top: 376px;
font-family: Trebuchet MS;
font-style: normal;
font-weight: bold;
font-size: 50px;
line-height: 160.5%;
color: white;
`
export default Home
