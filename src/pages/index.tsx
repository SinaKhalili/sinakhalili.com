import { getPosts } from "@/scripts/getPosts";
import Meta from "@/components/Meta";
import MeetMe from "@/components/MeetMe";
import PostItem from "@/components/PostItem";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  chakra,
  Image,
} from "@chakra-ui/react";
import { IndexCard } from "@/components/IndexCard";
import { PrinterPrint } from "@/components/Printer";
import { PopCitation } from "@/components/PopCitation";
import Link from "next/link";
import { projects } from "@/data/projects";
import { RecentItem } from "@/components/RecentItem";
import { CurrentlyReadingData } from "@/data/reading";

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
  PrinterPrint();

  return (
    <Box>
      <Meta title="Sina Khalili" />
      <Box my={5}>
        <Heading my={2}>howdy stranger</Heading>
        <Flex direction={{ base: "column", md: "row" }}>
          <VStack align="left">
            <Text>
              Hello friend. As the site name would suggest, I&apos;m Sina
              <PopCitation>
                Pronounced like the{" "}
                <chakra.span fontWeight="bold"> Cena</chakra.span> in John{" "}
                <chakra.span fontWeight="bold">Cena</chakra.span>.
              </PopCitation>
            </Text>
            <Text>
              I&apos;m probably thinking about software, art, film, startups,
              and the sublime. Statistically speaking, those interests are
              probably highly correlated, and if you&apos;re interested in any
              of those things, we&apos;ll probably have even more in common.
              <PopCitation>
                For example try putting your favourite subreddits into the{" "}
                <Link
                  className="md-link"
                  href="https://subredditstats.com/subreddit-user-overlaps/"
                >
                  subreddit overlap calculator
                </Link>{" "}
                and see just how aligned we are
              </PopCitation>
            </Text>
            <Box>
              <Text>
                I&apos;m currently working nowhere - I just graduated!
                <PopCitation>
                  Computer science at Simon Fraser University, incase you were
                  wondering.
                </PopCitation>
              </Text>
            </Box>
            <Text>
              Welcome to my little website. I hope you enjoy your stay.
            </Text>
            <Text>
              Like crosswords? Specifically the New York Times mini crossword?
              check out my{" "}
              <Link className="md-link" href="/projects/crossword">
                crossword leaderboard
              </Link>
            </Text>
          </VStack>
          <Image
            src="/computer_dance.gif"
            alt="Computer dancing"
            height={{ base: "auto", md: "300px" }}
          />
        </Flex>
      </Box>
      <VStack>
        <Heading>~ Recently ~</Heading>
        <Flex flexWrap="wrap">
          <Box
            p={2}
            m={2}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            w="100%"
          >
            <Text>
              posts{" "}
              <Link className="md-link" href="/posts">
                <chakra.span>(more)</chakra.span>
              </Link>
            </Text>
            {posts.map((post) => (
              <PostItem key={post.slug} post={post} />
            ))}
          </Box>
          <Box
            p={2}
            m={2}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
          >
            <Text>
              reading{" "}
              <Link className="md-link" href="/reading">
                <chakra.span>(more)</chakra.span>
              </Link>
            </Text>
            {CurrentlyReadingData.map((book) => (
              <RecentItem key={book.title} title={book.title} link="/reading" />
            ))}
          </Box>
          <Box
            p={2}
            m={2}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
          >
            <Text>
              projects{" "}
              <Link className="md-link" href="/projects">
                <chakra.span>(more)</chakra.span>
              </Link>
            </Text>
            {projects.map((project) => (
              <RecentItem
                key={project.name}
                title={project.name}
                link={project.website ? project.website : project.repo}
              />
            ))}
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
}
