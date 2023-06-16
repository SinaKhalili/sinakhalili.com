import Layout from "@/layouts/Layout";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

const FourOhFour = () => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Heading>Error 404 - wow it doesnt exist anymore</Heading>
      <Image
        src="https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif"
        alt="404 gif"
      />
    </Flex>
  );
};

export default FourOhFour;
