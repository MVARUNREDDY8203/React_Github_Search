import { Box, Button, Container, Flex, Image } from "@chakra-ui/react";
import React from "react";
import SearchHistory from "./SearchHistory";

const Navbar = () => {
    return (
        <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            py={"6"}
            bg={""}
        >
            <Box position={"relative"} aspectRatio={"5/3"} minHeight={"20"}>
                <Image
                    src='/github-mark-white.png'
                    alt='Test'
                    boxSize={"75px"}
                ></Image>
            </Box>
            <Box>
                <SearchHistory></SearchHistory>
            </Box>
        </Flex>
    );
};

export default Navbar;
