import { Heading, Flex, Divider, Text } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import CreateEvent from "../components/CreateEvent";
import EventCard from "../components/EventCard"
import InviteUser from "../components/InviteUser";
import MemberCard from "../components/MemberCard";
import Lottie from "lottie-react"
import noeventanimation from "../assets/soccer-noevents.json"

const TeamPage = () => {
  const [ isAdmin, setIsAdmin ] = useState(false)
  const [ events, setEvents ] = useState([])
  const [members,setMembers] = useState(null)
  const { id } = useParams()
  const { teams } = useContext(UserContext)
  const teamName = teams.find(team => team.member.teamId == id)?.name
  const token = localStorage.getItem("token")

  const getEvents = async () => {
    const response = await axios.get(`http://localhost:3000/api/event/${id}`,{
      headers: {Authorization: `Bearer ${token}`},
    })
    setEvents(response.data)
  }

  const getMembers = async()=>{
    const members = await axios.post(`http://localhost:3000/api/team/members`,{id},{
      headers: {Authorization: `Bearer ${token}`},
    })
    setMembers(members.data)
  }

  useEffect(() => {
    const checkAdmin = async () => {
      const response = await axios.get(`http://localhost:3000/api/team/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      setIsAdmin(response.data.isAdmin)
    }  
    checkAdmin()
    getEvents()
    getMembers()
  }, [])

  return (
      <Flex flexDirection="column" gap="8">
      <Heading size="md">{ teamName }</Heading>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="md" mr="auto">Members</Heading>
        <InviteUser isAdmin={isAdmin} getMembers={getMembers} />
      </Flex>
      <Flex flexDirection="column" gap="2">
        {members && members.map(member => <MemberCard key={member._id} {...{member,isAdmin}} />)}
      </Flex>
      <Divider />
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="md" mr="auto">Events</Heading>
        <CreateEvent {...{getEvents, isAdmin}} />
      </Flex>
        { !events.length && 
        <Flex flexDirection="column" alignItems="center" w="100%" gap="4">
          <Text fontSize="xl" fontWeight="bold" color="gray">No events</Text>
          <Lottie animationData={noeventanimation} loop={true} style={{ width: "40%" }} />
        </Flex>
        }
      <Flex justifyContent="space-between" flexWrap="wrap">
        { events && events.map(event => <EventCard key={event._id}  {...{event}}/>)}
      </Flex>
    </Flex>
  );
};

export default TeamPage;
