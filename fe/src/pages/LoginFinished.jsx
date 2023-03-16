import { useContext, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { UserContext } from "../context/UserContext"
import Lottie from "lottie-react"
import { Flex } from "@chakra-ui/react"
import loadingAnimation from "../assets/soccer-loading.json"

const LoginFinished = () => {
  const { login } = useContext(UserContext)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const code = searchParams.get("code")

  useEffect(() => {
    const sendCode = async () => {
      const response = await axios.post("http://localhost:3000/api/login", {code})
      const token = await response.data
      const decoded = jwt_decode(token)
      const user = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      }
      login(user, token)
      setTimeout(() => navigate("/dashboard"), 1400)
    }
    sendCode()
  }, [])

  return (
    <Flex justifyContent="center">
      <Lottie animationData={loadingAnimation} loop={false} style={{ width: "50%" }} />
    </Flex>
  )
}

export default LoginFinished
