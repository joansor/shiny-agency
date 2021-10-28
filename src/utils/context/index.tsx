import React, { useState, createContext } from 'react'

type ThemeContextInterface = {
    theme:string,
    toggleTheme: () => void
}
type SurveyContextInterface = {
    answers:{},
    setAnswers: React.Dispatch<React.SetStateAction<{}>>,
    saveAnswers: (newAnswers:any) => void
}


export const ThemeContext =  React.createContext<ThemeContextInterface | null>(null);

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const {answers}:any = {};

export const SurveyContext = React.createContext(answers)

export const SurveyProvider = ({ children }:any) => {
  const [answers, setAnswers] = useState({})
  const saveAnswers = (newAnswers: any) => {
    setAnswers({ ...answers, ...newAnswers })
  }

  return (
    <SurveyContext.Provider value={{ answers, saveAnswers }}>
      {children}
    </SurveyContext.Provider>
  )
}