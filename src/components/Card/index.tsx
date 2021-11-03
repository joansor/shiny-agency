import styled from 'styled-components'
import colors from '../../utils/style/colors'
import DefaultPicture from '../../assets/profile.png'
import { useTheme } from '../../utils/hooks'
import { useState } from 'react'

const CardLabel = styled.span`
  color: ${({ theme }) => (theme === 'light' ? colors.primary : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  padding-left: 15px;
`

const CardTitle = styled.span`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  align-self: center;
`

const CardImage = styled.img`
  height: 150px;
  width: 150px;
  align-self: center;
  border-radius: 50%;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  border-radius: 30px;
  width: 300px;
  height: 300px;
  &:hover {
    cursor: pointer;
  }
`
type CardProps = {
  label?: Required<string>
  title?: Required<string>
  picture?: Required<string>
}


Card.defaultProps = {
  label: '',
  title: '',
  picture: DefaultPicture,
}

function Card({ label, title, picture }: CardProps) {
  const { theme } = useTheme()
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const star = isFavorite ? '⭐️' : ''

  return (
    <CardWrapper theme={theme} onClick={() => setIsFavorite(!isFavorite)}>
      <CardLabel theme={theme}>{label}</CardLabel>
      <CardImage src={picture} alt="freelance" />
      <CardTitle theme={theme}>  {star} {title} {star}</CardTitle>
    </CardWrapper>
  )
}


export default Card