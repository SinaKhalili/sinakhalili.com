import { BookData } from "@/data/reading";
import { BookCard } from "./BookCard";
import { Box, Flex } from "@chakra-ui/react";

interface IReadingListProps {
  books: BookData[];
}

export const ReadingList = ({ books }: IReadingListProps) => {
  return (
    <Flex flexWrap="wrap" flexDirection={["column", "row"]}>
      {books.map((book, index) => (
        <BookCard key={index} title={book.title} image={book.cover} />
      ))}
    </Flex>
  );
};
