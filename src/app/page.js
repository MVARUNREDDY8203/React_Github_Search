"use client";
import { Button, Container, Flex, Spinner, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { useState } from "react";
import UserProfile from "./components/UserProfile";
import Repos from "./components/Repos";
import LoadingSpinner from "./components/LoadingSpinner";

export default function Home() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(null);
    return (
        <Container maxW='5xl'>
            <Navbar></Navbar>
            <Text align={"center"} fontSize={"3xl"} my={4}>
                Search Users On Github
            </Text>
            <Search
                setUserData={(res) => setUserData(res)}
                setLoading={setLoading}
            ></Search>

            {loading ? (
                <LoadingSpinner></LoadingSpinner>
            ) : (
                userData && <UserProfile userData={userData}></UserProfile>
            )}
        </Container>
    );
}
