import { links } from "@/data/links";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

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
          w="97%"
          borderRadius="10px"
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
          p={3}
        >
          <Text
            bg="whiteAlpha.600"
            w="100%"
            textAlign="center"
            fontFamily="charter"
            fontWeight="bold"
            p={3}
            borderRadius="full"
          >
            Cool links from around the web
          </Text>
          {links.map((link, index) => (
            <Box
              key={index}
              w="100%"
              my={3}
              bgColor="whiteAlpha.600"
              p={2}
              borderRadius="10px"
            >
              <Link className="md-link" href={link.href}>
                {link.href}
              </Link>
              <Text>{link.summary}</Text>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};
