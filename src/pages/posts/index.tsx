import { getPosts } from "@/scripts/getPosts";
import Meta from "@/components/Meta";
import MeetMe from "@/components/MeetMe";
import PostItem from "@/components/PostItem";
import { Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Quotey } from "@/components/Quotey";
import { allQuotes } from "@/data/quotes";

export const getStaticProps = () => {
  const posts = getPosts(100); // Will add pagination after 100 posts

  return {
    props: {
      posts,
    },
  };
};

interface HomeProps {
  posts: any[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <Meta />
      <Heading>Blog posts</Heading>
      <Box minH="100vh">
        <Text>
          Ah yes, blogging. The one thing that&apos;s been on my to-do list for
          as long as I can remember.
        </Text>
        <Text my={3}>
          Presented now in the only valid form a blog should ever be in: reverse
          chornological, no picture, no subtitle, a humble list of links:
        </Text>
        <Box>
          {posts.map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </Box>
        <Text mt={6}>Here are some of my favourite quotes on writing:</Text>
        <Quotey
          author={allQuotes["LamportWriting"].author}
          href={allQuotes["LamportWriting"].href}
        >
          {allQuotes["LamportWriting"].children}
        </Quotey>
        <Quotey
          author={allQuotes["PaulGrahamWriting"].author}
          href={allQuotes["PaulGrahamWriting"].href}
        >
          {allQuotes["PaulGrahamWriting"].children}
        </Quotey>
        <Quotey
          author={allQuotes["ManuelBlumWriting"].author}
          href={allQuotes["ManuelBlumWriting"].href}
        >
          {allQuotes["ManuelBlumWriting"].children}
        </Quotey>
      </Box>
    </>
  );
}
