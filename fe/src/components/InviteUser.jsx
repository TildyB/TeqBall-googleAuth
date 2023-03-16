import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useParams } from "react-router-dom"

const InviteUser = ({ isAdmin, getMembers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [userEmail,setUserEmail] = useState("")
  const toast = useToast();
  const initialRef = useRef(null)
  const token = localStorage.getItem("token")
  const {id} = useParams()

  const sendInviteUser = async () => {
    const response = await fetch("http://localhost:3000/api/invite",
    { method:"POST",
      body:JSON.stringify({userEmail,id}),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json" 
    },
  })
    if (!response.ok) {
        return toast({
            title: 'No user found, or user already invited.',
            description: "We've did not invited your friend.",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
    }
    toast({
        title: 'User has been invited.',
        description: "We've invited your friend.",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
        })
    getMembers()
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen} isDisabled={!isAdmin} size="sm" w="fit-content">Invite User</Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invite User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Uers Email</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Users email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={sendInviteUser}>Save</Button>
            <Button colorScheme="red" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default InviteUser
