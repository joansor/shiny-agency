import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/atoms'
import { SurveyContext } from '../../utils/context'
import { useFetch, useTheme } from '../../utils/hooks'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const QuestionContent = styled.span`
  margin: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

const ReplyBox = styled.button<{ isSelected: any }>`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

// type dataLoadingState = {
//   isDataLoading: boolean;
//   setDataLoading: React.Dispatch<React.SetStateAction<boolean>>;
// }
// type errorState = {
//   error: boolean;
//   setError: React.Dispatch<React.SetStateAction<boolean>>;
// }

// type surveyState = {
//   surveyData:surveyState[];
//   setSurveyData: React.Dispatch<React.SetStateAction<surveyState>>;
// }
type QuizParams = {
  questionNumber: any;
};

const Survey = () => {
  const { saveAnswers, answers }:any = useContext(SurveyContext)
  const { questionNumber } = useParams<QuizParams>()
  const questionNumberInt:number = parseInt(questionNumber)
  const prevQuestionNumber:number = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber:number = questionNumberInt + 1
  //const defaultServeyData:surveyState[] = [];
  // const [surveyData, setSurveyData]: [surveyState[], (surveyData: surveyState[]) => void] = useState(defaultServeyData);
  // const [isDataLoading, setDataLoading] : [boolean, (isDataLoading: boolean) => void] = useState<boolean>(true);
  // const [error, setError] = useState<boolean>(false)
  const { theme } = useTheme()
  const { data, isLoading, error } = useFetch(`http://localhost:8000/survey`)
  const surveyData = data?.surveyData

  function saveReply(answer:any) {
    console.log(answer)
    console.log(saveAnswers)
    saveAnswers({ [questionNumber]: answer })
  }

  // useEffect(() => {
  //   async function fetchSurvey() {
  //     setDataLoading(true)
  //     try {
  //       const response: Response = await fetch(`http://localhost:8000/survey`)
  //       const { surveyData } = await response.json()
  //       setSurveyData(surveyData)
  //     } catch (err) {
  //       console.log('===== error =====', err)
  //       setError(true)
  //     } finally {
  //       setDataLoading(false)
  //     }
  //   }
  //   fetchSurvey()
  // }, [])
  if (error) {
    return <span>Il y a un problème</span>
  }

  return (
    <SurveyContainer>
      <QuestionTitle theme={theme}>Question {questionNumber}</QuestionTitle>
      {isLoading ? (
        <Loader />
      ) : (
        <QuestionContent theme={theme}>{surveyData[questionNumber]}</QuestionContent>
      )}
       {answers && (
        <ReplyWrapper>
          <ReplyBox
            onClick={() => saveReply(true)}
            isSelected={answers[questionNumber] === true}
            theme={theme}>
            Oui
          </ReplyBox>
          <ReplyBox
            onClick={() => saveReply(false)}
            isSelected={answers[questionNumber] === false}
            theme={theme}>
            Non
          </ReplyBox>
        </ReplyWrapper>
      )}
       <LinkWrapper theme={theme}>
        <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
        {surveyData && surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  )
}

export default Survey