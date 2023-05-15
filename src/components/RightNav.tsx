import { Box, Flex, Text } from "@chakra-ui/react";

export const RightNav = () => {
  return (
    <Box flexGrow={1} bgColor="brand.100" w="350px" pr={4}>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="100%"
        w="100%"
      >
        <Flex
          direction="column"
          alignItems="center"
          h="97%"
          bgColor="white"
          w="97%"
          borderRadius="10px"
          shadow="lg"
          overflowY="scroll"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "black",
              borderRadius: "24px",
            },
          }}
          bgImage={`url('/depth.jpg')`}
        >
          <Text bg="white" w="100%" textAlign="center" fontWeight="bold" p={3}>
            Oh wow, its the right-nav!
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
