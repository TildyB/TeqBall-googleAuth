import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const LoginButton = () => {
  const { logout,isLoggedIn } = useContext(UserContext)
  const navigate = useNavigate()

  const logOut = () => {
    logout()
    navigate("/")
  }

  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth"
  const googleClientId = "939075084742-dn7f15nqs1s4pa1ql7igqhsiciel7d41.apps.googleusercontent.com"
  const redirectUri = "http://localhost:5173/loginfinished"
  const scope = "openid%20profile%20email%20https://www.googleapis.com/auth/calendar"
  const prompt = "consent"
  const googleUrl = `${rootUrl}?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&prompt=${prompt}`
  
  return (
    <>
    { isLoggedIn 
      ? <Button onClick={logOut}>Logout</Button>
      : <Button as="a" href={googleUrl}>Login</Button>
    }
    </>
  )
}

export default LoginButton