import { Text, Link, Box, Flex } from "@chakra-ui/react";

interface IQuoteyProps {
  author: string;
  href: string;
  children: React.ReactNode;
}

export const Quotey = ({ children, author, href }: IQuoteyProps) => {
  return (
    <Box
      mt={5}
      mx={1}
      p={3}
      borderRadius={5}
      _hover={{
        backgroundColor: "gray.100",
      }}
      transition="all 0.3s"
    >
      <Text fontFamily="charter">{children}</Text>

      <Flex
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        my={5}
      >
        <Text fontStyle="normal">
          {" "}
          <Link href={href}>{author}</Link>
        </Text>
      </Flex>
    </Box>
  );
};
