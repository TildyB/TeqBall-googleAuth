import { Outlet } from "react-router-dom"
import { Box, Flex } from "@chakra-ui/react"
import Navbar from "../components/Navbar"

const RootLayout = () => {
  return (
    <Flex w="100%" justifyContent="center" mb="16">
      <Box w="80%" maxW="1000px">
        <Navbar />
        <Outlet />
      </Box>
    </Flex>
  )
}

export default RootLayout