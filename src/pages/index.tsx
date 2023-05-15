import { getPosts } from "@/scripts/utils";
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
              Khalili.
              <PopCitation>
                Pronounced like the{" "}
                <chakra.span fontWeight="bold">Sina</chakra.span> in
                <chakra.span fontWeight="bold"> Sinatra</chakra.span> or John{" "}
                <chakra.span fontWeight="bold">Cena</chakra.span>, and the{" "}
                <chakra.span fontWeight="bold">Khalili</chakra.span> in
                <chakra.span fontWeight="bold"> Khalil</chakra.span> Gibran.
              </PopCitation>
            </Text>
            <Text>
              I&apos;m an enthousiaste of software, art, film, startups, and the
              sublime. Statistically speaking, those interests are probably
              highly correlated, and if you&apos;re interested in any of those
              things, we&apos;ll probably have even more in common.
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
          </VStack>
          <Image
            src="/computer_dance.gif"
            alt="Computer dancing"
            height={{ base: "auto", md: "300px" }}
          />
        </Flex>
      </Box>
      <VStack>
        <IndexCard title="BLOGPOSTS" bgURL="depth.jpg" />
        <IndexCard title="READING" bgURL="flux.svg" />
        <IndexCard title="PROJECTS" bgURL="grain.svg" />
      </VStack>
    </Box>
  );
}
