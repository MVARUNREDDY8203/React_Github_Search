import {
    Avatar,
    Badge,
    Box,
    Button,
    Flex,
    Image,
    Stack,
    Text,
} from "@chakra-ui/react";
import React from "react";
import Repos from "./Repos";

const UserProfile = ({ userData }) => {
    return (
        <>
            {/* green outlined flex for user profile */}
            <Flex
                border={"2px solid"}
                borderColor={"green.500"}
                borderRadius={4}
                padding={8}
                my={16}
            >
                {/* vertical stack for avatar and view profile button */}
                <Stack direction={"column"}>
                    <Avatar
                        size='2xl'
                        name={userData.name}
                        src={userData.avatar_url}
                    />
                    <Button my={15} colorScheme={"whatsapp"}>
                        <a href={userData.html_url} target='_blank'>
                            View Profile
                        </a>
                    </Button>
                </Stack>
                {/* another vertical stack for rightside user profile details */}
                <Stack direction={"column"} gap={3} ml={8}>
                    <Flex gap={4}>
                        <Badge fontSize={"0.9em"} colorScheme={"orange"}>
                            Public Repos: {userData.public_repos}
                        </Badge>
                        <Badge fontSize={"0.9em"} colorScheme={"blue"}>
                            Public Gists: {userData.public_gists}
                        </Badge>
                        <Badge fontSize={"0.9em"} colorScheme={"red"}>
                            Followers: {userData.followers}
                        </Badge>
                        <Badge fontSize={"0.9em"} colorScheme={"purple"}>
                            Following: {userData.following}
                        </Badge>
                    </Flex>
                    <Text
                        fontSize={"2xl"}
                        fontWeight={"bold"}
                        color={"green.300"}
                    >
                        {userData.name}
                    </Text>
                    <Text fontSize={"md"} color={"green.600"}>
                        {userData.bio}
                    </Text>
                    <Box>
                        <Text fontSize={"md"}>
                            <Text
                                as={"span"}
                                fontWeight={"bold"}
                                color={"green.200"}
                            >
                                Company:{" "}
                            </Text>
                            {userData.company || "Not Specified"}
                        </Text>
                        <Text fontSize={"md"}>
                            <Text
                                as={"span"}
                                fontWeight={"bold"}
                                color={"green.200"}
                            >
                                Location:{" "}
                            </Text>
                            {userData.location || "Not Specified"}
                        </Text>
                        <Text fontSize={"md"}>
                            <Text
                                as={"span"}
                                fontWeight={"bold"}
                                color={"green.200"}
                            >
                                Blog/Website:{" "}
                            </Text>
                            {userData.blog ? (
                                <a href={userData.blog} target='_blank'>
                                    {userData.blog}
                                </a>
                            ) : (
                                "Not Specified"
                            )}
                        </Text>
                        <Text fontSize={"md"}>
                            <Text
                                as={"span"}
                                fontWeight={"bold"}
                                color={"green.200"}
                            >
                                User since:{" "}
                            </Text>
                            {new Date(
                                userData.created_at
                            ).toLocaleDateString() || "Not Specified"}
                        </Text>
                    </Box>
                </Stack>
            </Flex>
            {/* Repo section below the user profile */}
            <Repos
                reposUrl={userData.repos_url}
                reposCount={userData.public_repos}
            ></Repos>
        </>
    );
};

export default UserProfile;
