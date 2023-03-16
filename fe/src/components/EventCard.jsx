import { Card, Heading, Text, Button, Flex, Stack, Image, useToast, Divider, CardBody, CardFooter } from "@chakra-ui/react"
import { CalendarIcon } from "@chakra-ui/icons"
import { TimeIcon } from "@chakra-ui/icons"
import formatDate from "../utils/formatDate"
import generateRandomHue from "../utils/randomNumber"

const EventCard = ({event}) =>{
  const token = localStorage.getItem("token")
  const toast = useToast()
  const hue = generateRandomHue()

    const saveToCalendar = async() =>{
        const id= event._id
        const response = await fetch("http://localhost:3000/api/event/addtocalendar",
        {
            method:"POST",
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
                    },
            body: JSON.stringify({id})
        },
       )
        if (!response.ok) {
          return toast({
              title: "Event not added",
              description: "We've could not add the event.",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
          })
        }
        toast({
          title: "Event added.",
          description: "We've added your event to your calendar.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        })
    }

  return (
    <Card w="calc(50% - 8px)" mb="16px">
      <CardBody>
        <Image
          src="https://gobekteqball.ro/wp-content/uploads/2020/10/Teqball-One-Szabolcs-Ilyes-1.jpg" borderRadius="md" filter={`hue-rotate(${hue}deg)`} />
        <Stack mt="6" spacing="2">
          <Heading size="md">{event.summary}</Heading>
          <Text fontWeight="bold">{event.location}</Text>
          <Text fontSize="sm">{event.description}</Text>
          <Divider />
          <Flex flexDirection="column" gap="2">
            <Text fontSize="sm"><TimeIcon /> {formatDate(event.start.dateTime)}</Text>
            <Text fontSize="sm"><TimeIcon /> {formatDate(event.end.dateTime)}</Text>
          </Flex>
        </Stack>
      </CardBody>
      <CardFooter>
          <Button onClick={saveToCalendar} size="sm" leftIcon={<CalendarIcon/>}>Add to Calendar</Button>
      </CardFooter>
    </Card>
    )
}

export default EventCard