import {
    Badge,
    Button,
    Flex,
    Link,
    Text,
    Toast,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const Repos = ({ reposUrl, reposCount }) => {
    const toast = useToast();
    const [repos, setRepos] = useState([]);
    const [loadingr, setLoadingr] = useState(false);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const fetch_repos = async () => {
            try {
                setLoadingr(true);
                const res = await fetch(
                    reposUrl + "?page=1&per_page=" + reposCount
                );
                const data = await res.json();
                if (data.message) throw new Error(data.message);
                setRepos(data);
                console.log(repos);
            } catch (e) {
                return toast({
                    title: "Error",
                    description: e.message,
                    duration: "4000",
                    status: "error",
                    isClosable: "true",
                });
            } finally {
                setLoadingr(false);
            }
        };
        fetch_repos();
    }, [reposUrl, toast]);

    return (
        <>
            <Text
                align={"center"}
                color={"green.500"}
                fontSize={"3xl"}
                fontWeight={"bold"}
                letterSpacing={"1.5"}
            >
                REPOSITORIES
            </Text>
            {loadingr ? (
                <LoadingSpinner></LoadingSpinner>
            ) : (
                <>
                    {repos
                        .sort((a, b) => b.stargazers_count - a.stargazers_count) // sorting the array
                        .map((repo, idx) => {
                            // mapping each element of the array
                            if (idx > 4 && !showMore) return null;
                            return (
                                <Flex
                                    alignItems={"center"}
                                    bg={"whiteAlpha.200"}
                                    borderRadius={4}
                                    gap={4}
                                    justifyContent={"space-between"}
                                    key={repo.id}
                                    my={4}
                                    padding={"4"}
                                    px={10}
                                    transition={"all 0.3s ease"}
                                    _hover={{ bg: "whiteAlpha.400" }}
                                >
                                    {/* Left side Repo name + Language */}
                                    <Flex flex={1} direction={"column"}>
                                        {/* Repo name */}
                                        <Link
                                            href={repo.html_url}
                                            fontSize={"md"}
                                            fontWeight={"bold"}
                                        >
                                            {repo.name}
                                        </Link>
                                        {/* Repo language */}
                                        <Badge
                                            fontSize={"0.7em"}
                                            width={"min-content"}
                                            align={"center"}
                                            my={2}
                                            colorScheme={"whatsapp"}
                                        >
                                            Language : {repo.language || "None"}
                                        </Badge>
                                    </Flex>

                                    {/* right side badges - stars, forks, watchers */}
                                    <Flex flex={1} gap={4} ml={6}>
                                        <Badge
                                            flex={1}
                                            fontSize={"0.9em"}
                                            colorScheme={"orange"}
                                            textAlign={"center"}
                                        >
                                            Stars: {repo.stargazers_count}
                                        </Badge>
                                        <Badge
                                            flex={1}
                                            fontSize={"0.9em"}
                                            colorScheme={"pink"}
                                            textAlign={"center"}
                                        >
                                            Forks: {repo.forks_count}
                                        </Badge>
                                        <Badge
                                            flex={1}
                                            fontSize={"0.9em"}
                                            colorScheme={"cyan"}
                                            textAlign={"center"}
                                        >
                                            Watchers: {repo.watchers_count}
                                        </Badge>
                                    </Flex>
                                </Flex>
                            );
                        })}
                    {/* SHOW MORE/ SHOW LESS BUTTON */}
                    {!showMore && (
                        <Flex
                            align={"center"}
                            flex={1}
                            justifyContent={"center"}
                            my={4}
                        >
                            <Button
                                size={"md"}
                                colorScheme={"whatsapp"}
                                onClick={() => setShowMore(true)}
                            >
                                Show More
                            </Button>
                        </Flex>
                    )}
                    {showMore && repos.length > 5 && (
                        <Flex
                            align={"center"}
                            flex={1}
                            justifyContent={"center"}
                            my={4}
                        >
                            <Button
                                size={"md"}
                                colorScheme={"whatsapp"}
                                onClick={() => setShowMore(false)}
                            >
                                Show Less
                            </Button>
                        </Flex>
                    )}
                </>
            )}
        </>
    );
};

export default Repos;
