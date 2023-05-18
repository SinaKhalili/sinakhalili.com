import { Flex, Box } from "@chakra-ui/react";

interface IMainSectionProps {
  children: React.ReactNode;
}

export const MainSection = ({ children }: IMainSectionProps) => {
  return (
    <Box
      flexGrow={1}
      bgColor="brand.100"
      w="100%"
      mb={["20px", "20px", "20px", "0px"]}
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        h={["auto", "auto", "auto", "100%"]}
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
          overflowY={["auto", "auto", "auto", "scroll"]}
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
        >
          <Box
            w={["auto", "auto", "75ch"]}
            minH={["100vh", "100vh", "100vh", "auto"]}
            fontSize="16px"
            my="20px"
          >
            <Box>{children}</Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
