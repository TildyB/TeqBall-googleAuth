import { Card, CardBody, CardFooter, Image, Stack, Text, Heading, Button, Badge } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import generateRandomHue from "../utils/randomNumber"

const TeamCard = ({ team }) => {
  const navigate = useNavigate()
  const [ isAccepted, setIsAccepted ] = useState(team.member.accepted)
  const token = localStorage.getItem("token")
  const teamId = team.member.teamId
  const hue = generateRandomHue()

  const joinTeam = async () => {
    const response = await axios.post("http://localhost:3000/api/user/join", {teamId}, {
      headers: {Authorization: `Bearer ${token}`},
    })
    if(response.status === 200)setIsAccepted(true)
  }

  return (
    <Card w="calc(50% - 8px)" mb="16px" backgroundColor={ !isAccepted && "gray.100" }>
      <CardBody>
        <Image src="https://images.unsplash.com/photo-1509419573860-712f07d5310f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2665&q=80" borderRadius="md" filter={!isAccepted ? `grayscale(100%) opacity(0.6)` : `hue-rotate(${hue}deg)`} />
        <Stack mt="2">
          <Heading size="md">{ team.name }</Heading>
          { !isAccepted 
            ? <Badge colorScheme="blue" w="fit-content" px="2">Pending</Badge>
            : team.member.admin 
              ? <Badge colorScheme="red" w="fit-content" px="2">Admin</Badge>
              : <Badge colorScheme="green" w="fit-content" px="2">Player</Badge>
          }
          <Text>{ team.events > 1 ? `${team.events} events` : !team.events ? "No events" : `${team.events} event` }</Text>
        </Stack>
      </CardBody>
      <CardFooter>
        { isAccepted
          ? <Button size="sm" onClick={() => navigate(`/dashboard/${team.member.teamId}`)}>Enter team</Button>
          : <Button size="sm" onClick={joinTeam} colorScheme={ !isAccepted && "yellow" }>Join team</Button>
        }
      </CardFooter>
    </Card>
  )
}

export default TeamCard