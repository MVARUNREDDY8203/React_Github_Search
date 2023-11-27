import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const LoadingSpinner = () => {
    return (
        <>
            <Flex align={"center"} justify={"center"} h={"10vh"}>
                <Spinner
                    thickness='4px'
                    speed='1s'
                    emptyColor='gray.200'
                    color='green.500'
                    size='xl'
                />
            </Flex>
        </>
    );
};

export default LoadingSpinner;
