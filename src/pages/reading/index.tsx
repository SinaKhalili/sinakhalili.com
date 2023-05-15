import { ReadingList } from "@/components/ReadingList";
import { Text, Box, Heading, Image, VStack, Flex } from "@chakra-ui/react";
import {
  CurrentlyReadingData,
  FavoriteBooksData,
  RecentlyReadData,
} from "@/data/reading";
import Link from "next/link";
import { BookListTable } from "@/components/BookListTable";

export default function Reading() {
  return (
    <>
      <VStack spacing="20px">
        <Heading>Reading</Heading>
        <Text>Here&apos;s what I&apos;m currently reading</Text>
        <ReadingList books={CurrentlyReadingData} />
        <Heading>Recently read</Heading>
        <ReadingList books={RecentlyReadData} />
        <Heading>Favourite books</Heading>
        <Text fontSize="sm">(In no particular order)</Text>
        <BookListTable books={FavoriteBooksData} />
      </VStack>
      <Flex direction="column" my="45px">
        <Text>
          Some reading lists I like are{" "}
          <Link
            className="md-link"
            href="https://www.ribbonfarm.com/now-reading/"
          >
            Ribbonfarm&apos;s
          </Link>
          ,{" "}
          <Link className="md-link" href="https://macwright.com/reading/">
            Tom MacWright&apos;s
          </Link>
          , and{" "}
          <Link
            className="md-link"
            href="https://news.ycombinator.com/item?id=22092108"
          >
            this hackernews thread
          </Link>
          .
        </Text>
        <Box>
          I also have a{" "}
          <Link
            className="md-link"
            href="https://www.goodreads.com/user/show/55989100-sina-khalili"
          >
            goodreads
          </Link>{" "}
          I always forget to update, but feel free to add me there - I like
          seeing what other people are reading.
        </Box>
      </Flex>
    </>
  );
}
