"use client";
import { Button, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";

const Search = ({ setUserData, setLoading }) => {
    const [query, setQuery] = useState("");
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query) return;
        setLoading(true);
        setUserData(null);
        try {
            const result = await fetch(`https://api.github.com/users/${query}`);
            const data = await result.json();

            if (data.message === "Not Found") {
                return toast({
                    title: "User Not Found",
                    description: "Try searching for something else",
                    duration: "4000",
                    status: "error",
                    isClosable: "true",
                });
            }
            setUserData(data);
            addUserToLocalStorage(data, query);
        } catch (e) {
            return toast({
                title: "Error",
                description: e.message,
                duration: "4000",
                status: "error",
                isClosable: "true",
            });
        } finally {
            setLoading(false);
        }
    };

    // function to add user to local storage on a successful search
    const addUserToLocalStorage = (data, username) => {
        const users = JSON.parse(localStorage.getItem("github-users")) || []; // get the item "github-users" from localStorage if it exists or return an empty array
        const userExists = users.find((user) => user.id === username); // if the user already exists return the users

        if (userExists) {
            users.splice(users.indexOf(userExists), 1);
        }
        // adding a new item to the start of the users array
        users.unshift({
            id: username,
            avatar_url: data.avatar_url,
            name: data.name,
            url: data.html_url,
        });
        // set an item in the local storage with name "github-users"
        localStorage.setItem("github-users", JSON.stringify(users));
    };
    return (
        <form onSubmit={handleSubmit}>
            <Input
                variant={"outline"}
                placeholder='Type a username (for example : MVARUNREDDY8203)'
                focusBorderColor='green.500'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button
                size={"md"}
                type='submit'
                colorScheme={"whatsapp"}
                mt={"4"}
                disabled={!query}
                opacity={query ? 1.0 : 0.5}
            >
                Search
            </Button>
        </form>
    );
};

export default Search;
