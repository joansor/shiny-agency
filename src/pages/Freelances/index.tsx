import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
// import { useState, useEffect } from 'react'
import { Loader } from '../../utils/style/atoms'
import { useFetch, useTheme } from '../../utils/hooks'

// type dataLoadingState = {
//   isDataLoading: boolean
//   setDataLoading: React.Dispatch<React.SetStateAction<boolean>>
// }
// type errorState = {
//   error: boolean
//   setError: React.Dispatch<React.SetStateAction<boolean>>
// }
// type freelancersList = {
//   freelancesData: freelancersList[]
//   setFreelancesData: React.Dispatch<React.SetStateAction<freelancersList>>
// }

function Freelances() {
  const { theme } = useTheme()
 // const [isDataLoading, setDataLoading] = useState(false)
  //const [error, setError] = useState(false)
  //const defaultFreelanceData:freelancersList[] = [];
 // const [freelancersList, setFreelancesList] = useState(defaultFreelanceData)
  const { data, isLoading, error } = useFetch(
    `http://localhost:8000/freelances`
  )


  // useEffect(() => {
  //   async function fetchFreelances() {
  //     setDataLoading(true)
  //     try {
  //       const response = await fetch(`http://localhost:8000/freelances`)
  //       const { freelancersList } = await response.json()
  //       setFreelancesList(freelancersList)
  //       console.log(freelancersList)
  //     } catch (err) {
  //       console.log('===== error =====', err)
  //       setError(true)
  //     } finally {
  //       setDataLoading(false)
  //     }
  //   }
  //   fetchFreelances()
  // }, [])

  if (error) {
    return <span>Il y a un problème</span>
  }

  const freelancersList:any[] = data?.freelancersList
  console.log(freelancersList)
  return (
    <div>
      <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
      <PageSubtitle theme={theme}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      {isLoading ? (
        <LoaderWrapper>
          <Loader theme={theme}/>
        </LoaderWrapper>
      ) : (
      <CardsContainer>
        {freelancersList.map((profil:any) => (
          <Card
            key={`${profil.name}-${profil.id}`}
            label={profil.job}
            title={profil.name}
            picture={profil.picture}
          />
        ))}
      </CardsContainer>
       )}
    </div>
  )
}
const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`

const PageTitle = styled.h1`
  font-size: 30px;
  color: white;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`
export default Freelances
