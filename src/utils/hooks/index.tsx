import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../context'

type dataState = {
    data: {}
    setData:  React.Dispatch<React.SetStateAction<dataState>>
}

export function useFetch(url:string): { isLoading: boolean; data: any; error: boolean } {
  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!url) return 
    setLoading(true)
    async function fetchData() {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
      } catch (err) {
        console.log(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])
  return { isLoading, data, error }
}


export function useTheme() {
  const { theme, toggleTheme }:any = useContext(ThemeContext)
  return { theme, toggleTheme }
}