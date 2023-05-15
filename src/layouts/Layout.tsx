import { LeftNav } from "@/components/LeftNav";
import {
  Flex,
  Heading,
  Box,
  Text,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MainSection } from "@/components/MainSection";
import { RightNav } from "@/components/RightNav";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const isDesktop = useBreakpointValue({ base: false, md: false, lg: true });
  return (
    <>
      <Flex
        h={["auto", "auto", "auto", "98vh"]}
        direction={{ base: "column", lg: "row" }}
      >
        <Box w={["100%", "100%", "100%", "300px"]} h="100%">
          <LeftNav />
        </Box>
        <MainSection>{children}</MainSection>
        {isDesktop && <RightNav />}
      </Flex>
      <Box h="2vh" bgColor="black" overflow="hidden">
        <Text
          textAlign="center"
          fontFamily="monospace"
          fontSize="xs"
          color="white"
        >
          beep boop beep boop
        </Text>
      </Box>
    </>
  );
};

export default Layout;
