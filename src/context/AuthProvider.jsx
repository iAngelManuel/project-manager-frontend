import { useState, useEffect, createContext } from 'react'
import clientAxios from '../config/clientAxios'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [ auth, setAuth ] = useState({})
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        return setLoading(false)
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
      try {
        const { data } = await clientAxios('/users/profile', config)
        setAuth(data)
      } catch (err) {
        setAuth({})
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    authUser()
  }, [])

  const logout = () => {
    setAuth({})
  }

  return (
    <AuthContext.Provider 
    value={{
      auth,
      setAuth,
      loading,
      logout
    }}>{children}</AuthContext.Provider>
  )
}
