import { Flex, Text, Button, Avatar } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import LoginButton from "./LoginButton"

const Navbar = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <Flex py="4" mb="8" borderBottom="1px" borderColor="gray.300" justifyContent="space-between" alignItems="center">
      <Text onClick={() => navigate("/")} fontWeight="bold" cursor="pointer">Teqball Reserve</Text>
      <Flex gap="4" alignItems="center">
        { user && <Button onClick={() => navigate("/dashboard")} variant="outline">Dashboard</Button> }
        <LoginButton />
        { user && <Avatar src={user?.picture} referrerPolicy="no-referrer" onClick={() => navigate("/dashboard")} size="sm" bg="teal.100" cursor="pointer" ></Avatar> }
      </Flex>
    </Flex>
  )
}

export default Navbar