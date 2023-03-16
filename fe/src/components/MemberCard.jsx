import { Flex, Button, Text, Badge, Avatar } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const MemberCard = ({ member,isAdmin }) =>{
    const {id} = useParams()
    const token = localStorage.getItem("token")
    const [ admin, setAdmin ] = useState()
    const [ accepted, setAccepted ] = useState()
    const data = member.member.find(x => x.teamId == id)

  useEffect(() => {
    if (data.admin) setAdmin(true)
    if (data.accepted) setAccepted(true)
  }, [])

  const addAdmin =async() =>{
    const userId = member._id
    const addToAdmin = await axios.post("http://localhost:3000/api/user/makeadmin", {userId, id}, {
        headers: {Authorization: `Bearer ${token}`},
    })
    setAdmin(true) 
  }

  return (
    <Flex alignItems="center" gap="2">
      <Avatar src={member?.picture} referrerPolicy="no-referrer" size="xs" bg="teal" ></Avatar>
      { admin 
        ? <Badge colorScheme="red" w="fit-content" px="2" size="xs">Admin</Badge>
        : <Badge colorScheme="green" w="fit-content" px="2">Player</Badge>
      }
      { !accepted && <Badge colorScheme="gray" w="fit-content" px="2" size="xs">Pending</Badge> }
      <Text>{member.name}</Text>
      <Text fontSize="xs" fontWeight="bold" color="gray">({member.email})</Text>
      {isAdmin && !admin && <Button onClick={addAdmin} size="xs" variant="outline" ml="auto">Add admin</Button>}
    </Flex>
  )
}

export default MemberCard