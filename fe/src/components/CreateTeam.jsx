import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { useRef, useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"

const CreateTeam = () => {
  const { getTeams } = useContext(UserContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ teamName, setTeamName ] = useState("")
  const toast = useToast()
  const initialRef = useRef(null)
  const token = localStorage.getItem("token")

  const sendTeam = async () => {
    const response = await axios.post("http://localhost:3000/api/team", {teamName}, {
      headers: {Authorization: `Bearer ${token}`},
    })
    if (response.statusText === "OK") {
      toast({
        title: 'Team created.',
        description: "We've created your team.",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      await getTeams()
      onClose()
    }
  }

  return (
    <>
      <Button onClick={onOpen} size="sm" leftIcon={<AddIcon />} w="fit-content">Create Team</Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your team</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Team name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={sendTeam}>Save</Button>
            <Button colorScheme="red" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateTeam
