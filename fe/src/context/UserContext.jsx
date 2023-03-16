import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [ user, setUser ] = useState(null)
  const [ teams, setTeams ] = useState(null)
  const [ isLoggedIn,setIsLoggedIn ] = useState(false)
  
  const login = (user, token) => {
    setUser(user)
    setIsLoggedIn(true)
    localStorage.setItem("token", token)
    localStorage.setItem("user",JSON.stringify(user))
  }
  
  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  useEffect(()=> {
    if (localStorage.getItem("token")) {
      setUser(JSON.parse(localStorage.getItem("user")))
      setIsLoggedIn(true)
    }
  }, [])
  
  const getTeams = async () => {
    const token = localStorage.getItem("token")
    const response = await axios.get("http://localhost:3000/api/team", {
      headers: {Authorization: `Bearer ${token}`},
    })
    setTeams(response.data)
  }
 
  return (
    <UserContext.Provider value={{user, login, logout, teams, getTeams, isLoggedIn }}>
      {children}
    </UserContext.Provider>
    )
}
