import styled from 'styled-components'
import illustration from '../../assets/404.svg'

function Error() {
    return (
      <div>
        <ContainerError/>
        <TextOups>oups</TextOups>
        <Illustration src={illustration} alt="illustration" />
        <TextDesc>Copy Il semblerait que la page que vous cherchez n’existe pas</TextDesc>
      </div>
    )
  }
  const ContainerError = styled.div`
  position: absolute;
  width: 1313px;
  height: 1256px;
  left: 63px;
  top: 189px;
  background: #4F4C6B;
`
const TextOups = styled.div`
position: absolute;
width: 463px;
height: 77px;
left: 488px;
top: 288px;
font-family: Trebuchet MS;
font-style: normal;
font-weight: bold;
font-size: 31px;
line-height: 36px;
text-align: center;
color: #FFFFFF;
`
const TextDesc = styled.div`
position: absolute;
width: 878px;
height: 127px;
left: 271px;
top: 954px;

font-family: Trebuchet MS;
font-style: normal;
font-weight: bold;
font-size: 31px;
line-height: 36px;
text-align: center;

color: #FFFFFF;

`
const Illustration = styled.img`
position: absolute;
width: 875px;
height: 476px;
left: 282px;
top: 390px;
`
  export default Error