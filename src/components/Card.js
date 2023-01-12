import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.

  return (
    <VStack borderRadius="xl" bg="white" overflow="hidden">
      <Image borderRadius="xl" fit="cover" src={imageSrc}></Image>
      <Box p={2}>
        <Heading as="h4" size="md" color="black">
          {title}
        </Heading>
        <Text color="grey">
          {description}
        </Text>
        <HStack pt={2}>
          <Heading as="h6" size="xs" color="black">
            See more
          </Heading>
          <FontAwesomeIcon color="black" icon={faArrowRight} size="1x" />
        </HStack>
      </Box>
    </VStack>
  );
};

export default Card;
