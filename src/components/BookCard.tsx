import { Box, Heading, Image } from "@chakra-ui/react";

interface IBookCardProps {
  title: string;
  image?: string;
}

export const BookCard = ({ title, image }: IBookCardProps) => {
  return (
    <Box
      w="200px"
      p={2}
      h="300px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgColor="gray.100"
      m={1}
    >
      <Heading size="sm">{title}</Heading>
      <Image src={image} h="200px" alt={title} />
    </Box>
  );
};
