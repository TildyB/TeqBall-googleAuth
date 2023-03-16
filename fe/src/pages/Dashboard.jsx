import CreateTeam from "../components/CreateTeam"
import TeamCard from "../components/TeamCard"
import { Heading, Flex } from "@chakra-ui/react"
import { useEffect } from "react"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const Dashboard = () => {
  const { teams, getTeams } = useContext(UserContext)

  useEffect(() => {
    getTeams()
  }, [])

  return (
    <Flex flexDirection="column" gap="8">
      <Heading size="md">Dashboard</Heading>      
      <Flex justifyContent="space-between">
        <Heading size="md" >Your teams</Heading>
        <CreateTeam />
      </Flex>
      <Flex justifyContent="space-between" flexWrap="wrap">
      { teams && teams.map(team => (
        <TeamCard key={team.member.teamId} team={team} />
      ))}
      </Flex>
    </Flex>
  )
}

export default Dashboard