import { Flex, Box } from "@chakra-ui/react";

interface IMainSectionProps {
  children: React.ReactNode;
}

export const MainSection = ({ children }: IMainSectionProps) => {
  return (
    <Box flexGrow={1} mb={["20px", "20px", "20px", "0px"]}>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        h={["auto", "auto", "auto", "100%"]}
      >
        <Flex
          direction="column"
          alignItems="center"
          h="97%"
          w="100%"
          bgColor="white"
          borderRadius="10px"
          px={[5, 5, 5, 2]}
          shadow="lg"
          overflowY={["auto", "auto", "auto", "scroll"]}
          overflowX="hidden"
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
            w={["95vw", "95vw", "75ch"]}
            minH={["100vh", "100vh", "100vh", "auto"]}
            fontSize="16px"
            my="20px"
            className="shellem"
          >
            {children}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
