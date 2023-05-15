import { Box, Flex, Text } from "@chakra-ui/react";

interface IIndexCardProps {
  title: string;
  bgURL: string;
}

export const IndexCard = ({ title, bgURL }: IIndexCardProps) => {
  return (
    <Box
      w="100%"
      h="100px"
      bgImage={`url('/${bgURL}')`}
      borderRadius="10px"
      shadow="md"
      _hover={{
        cursor: "pointer",
        transform: "scale(1.05)",
      }}
      _active={{
        transform: "scale(1)",
      }}
      transition="all 0.2s ease-in-out"
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="100%"
      >
        <Text color="white" fontWeight="bold" fontSize="40px">
          {title}
        </Text>
      </Flex>
    </Box>
  );
};
