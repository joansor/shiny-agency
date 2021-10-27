import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/atoms'

type surveyState = {
  surveyData:surveyState[];
  setSurveyData: React.Dispatch<React.SetStateAction<surveyState>>;
}
type dataLoadingState = {
  isDataLoading: boolean;
  setDataLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
type errorState = {
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}
type QuizParams = {
  questionNumber: any;
};
function Survey(): JSX.Element {
  const { questionNumber } = useParams<QuizParams>()
  const questionNumberInt:number = parseInt(questionNumber)
  const prevQuestionNumber:number = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber:number = questionNumberInt + 1
  const defaultServeyData:surveyState[] = [];
  const [surveyData, setSurveyData]: [surveyState[], (surveyData: surveyState[]) => void] = useState(defaultServeyData);
  const [isDataLoading, setDataLoading] : [boolean, (isDataLoading: boolean) => void] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    async function fetchSurvey() {
      setDataLoading(true)
      try {
        const response: Response = await fetch(`http://localhost:8000/survey`)
        const { surveyData } = await response.json()
        setSurveyData(surveyData)
      } catch (err) {
        console.log('===== error =====', err)
        setError(true)
      } finally {
        setDataLoading(false)
      }
    }
    fetchSurvey()
  }, [])

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumber}</QuestionTitle>
      {isDataLoading ? (
        <Loader />
      ) : (
        <QuestionContent>{surveyData[questionNumber]}</QuestionContent>
      )}
      <LinkWrapper>
        <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
        {surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  )
}

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
  color: white;
`

const QuestionContent = styled.span`
  margin: 30px;
  color: white;
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: white;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`
export default Survey