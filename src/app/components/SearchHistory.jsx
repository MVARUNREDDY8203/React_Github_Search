import { DeleteIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    VStack,
    Text,
    Flex,
    Avatar,
    Box,
    Link,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const SearchHistory = () => {
    const [history, setHistory] = useState([]);
    const toast = useToast();

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("github-users")) || [];
        setHistory(users);
    }, [history]);

    const handleDeleteUser = (userId) => {
        const users = JSON.parse(localStorage.getItem("github-users")) || [];
        const userToDelete = users.find((user) => user.id === userId);
        if (userToDelete) users.splice(users.indexOf(userToDelete), 1);

        localStorage.setItem("github-users", JSON.stringify(users));
        setHistory(users);
        toast({
            title: "Success",
            description: "User entry deleted from Search-History",
            duration: "4000",
            status: "success",
            isClosable: "true",
        });
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen} colorScheme='whatsapp' mt={4}>
                Search History
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={"gray.900"}>
                    <ModalHeader>
                        <Text
                            color={"gray.200"}
                            fontWeight={"bold"}
                            fontSize={"3xl"}
                            textAlign={"center"}
                            mt={5}
                        >
                            Search History
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text color={"gray.400"} mb={3}>
                            You have searched for:
                        </Text>
                        <VStack gap={4} maxH={300} overflowY={"auto"}>
                            {history.length === 0 && (
                                <Text
                                    color={"gray.400"}
                                    fontSize={"sm"}
                                    fontWeight={"bold"}
                                    my={"5"}
                                >
                                    You have not searched any users
                                </Text>
                            )}
                            {history.map((user) => (
                                // parent flex for a single history card
                                <Flex
                                    key={user.id}
                                    alignItems={"center"}
                                    bg={"whiteAlpha.200"}
                                    w={"full"}
                                    _hover={{ bg: "whiteAlpha.400" }}
                                    borderRadius={4}
                                    p={2}
                                    cursor={"pointer"}
                                    justifyContent={"space-between"}
                                >
                                    <Flex gap={2} alignItems={"center"}>
                                        <Avatar
                                            display={"block"}
                                            size={"lg"}
                                            name={"user.name"}
                                            src={user.avatar_url}
                                        ></Avatar>
                                        <Box>
                                            <Text fontWeight={"bold"}>
                                                {user.name || "user"}
                                            </Text>
                                            <Text
                                                fontSize={"sm"}
                                                color={"gray.400"}
                                            >
                                                {user.id}
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Flex alignItems={"center"} gap={4}>
                                        <Link
                                            target='_blank'
                                            href={user.url}
                                            size={"sm"}
                                            color='black'
                                            bg='whatsapp.200'
                                            px={2}
                                            borderRadius={4}
                                            _hover={{
                                                textDecoration: "none",
                                                bg: "whatsapp.300",
                                            }}
                                        >
                                            Visit
                                        </Link>
                                        <DeleteIcon
                                            color='red.400'
                                            onClick={() =>
                                                handleDeleteUser(user.id)
                                            }
                                        />
                                    </Flex>
                                </Flex>
                            ))}
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme={"red"} mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SearchHistory;
