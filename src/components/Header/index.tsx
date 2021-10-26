import { Link } from 'react-router-dom'
import logo from '../../assets/dark-logo.png'
import styled from 'styled-components'


function Header():JSX.Element {
  return (
    <nav>
      <Logo src={logo} alt="logo"/>
      <ContainerLink>
      <StyledLink className='home' to="/">Accueil</StyledLink>
      <StyledLink to="/survey/1">Questionnaire</StyledLink>
      <StyledLink className='freelances' to="/freelances">Freelance</StyledLink>
      </ContainerLink>
    </nav>
  )
}
const Logo = styled.img`
position: absolute;
width: 186.34px;
height: 70px;
left: 26px;
top: 51px;
`
const ContainerLink = styled.div`
position: absolute;
width: 80px;
height: 22px;
left: 991px;
top: 75px;
`
const StyledLink = styled(Link)`
font-family: Trebuchet MS;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 23px;
text-decoration:none;
color: #FFFFFF;
&.home{
  margin-right: 35px; 
}
&.freelances{
  margin-left: 24px; 
}
`

export default Header