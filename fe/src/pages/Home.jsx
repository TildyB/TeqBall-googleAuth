import { Flex, Text, Heading, Highlight, Box } from "@chakra-ui/react"
import bgImage from "../assets/teqball-illustration.jpg"

const Home = () => {
  return (
    <>
    <Flex flexDirection="column" alignItems="center" gap="8">
        <Flex w="100%" p="20%" flexDirection="column" gap="8" justifyContent="center" alignItems="center" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} borderRadius="8" bg="teal">
          <Heading textAlign="center" color="white">
            <Highlight query={["Teqball"]} styles={{ px: "4", py: "0.5", rounded: "full", bg: "yellow.400" }}>
              Take your Teqball game to the next level with our event creation tool
            </Highlight>
            </Heading>
          <Text textAlign="center" fontWeight="bold" color="white">Welcome to Teqball Reserve, the premier destination for creating Teqball events online. Our platform makes it easy for you to create and enjoy Teqball games with your friends, family, or colleagues.</Text> 
      </Flex>

      <Flex gap="8" alignItems="flex-start">
        <Box w="50%" alignSelf="stretch">
          <Box as="video" loop muted autoPlay objectFit="cover" w="100%" h="100%"
            src="https://assets.fiteq.org/teqball/hero_500k.mp4" borderRadius="8"
          />
        </Box>
        <Flex w="50%" flexDirection="column" gap="8">
          <Heading size="lg">What is teqball?</Heading>
          <Text>Teqball is a ball sport that is played on a curved table, combining elements of sepak takraw and table tennis. Back and forth, the players hit a football with any part of the body except arms and hands. Teqball can be played between two players as a singles game, or between four players as a doubles game. The game is represented at an international level by the International Federation of Teqball (FITEQ). A number of world-class footballers have been attracted by the game, and after being added to the programmes for the 2021 Asian Beach Games and the 2023 European Games, the sport is now aiming for Olympic inclusion.</Text> 
        </Flex>
      </Flex>
    </Flex>
    </>
  )
}

export default Home