import { CrosswordCreateRoom } from "@/components/CrosswordCreateRoom";
import { PopCitation } from "@/components/PopCitation";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import {
  LeaderboardItem,
  LeaderboardItemResponse,
} from "@/lib/crossword/types";
import { CheckIcon, SpinnerIcon } from "@chakra-ui/icons";
import {
  Text,
  Box,
  Heading,
  VStack,
  Flex,
  Input,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

type CrosswordUser = {
  username: string;
  id: string;
  first_place_finishes: number;
  second_place_finishes: number;
  total_solves_attempted: number;
};

export default function Projects() {
  const [error, setError] = useState(false);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardWithStats, setLeaderboardWithStats] = useState([]);
  const [showCreateLeaderboard, setShowCreateLeaderboard] = useState(false);

  useEffect(() => {
    const getLeaderboards = async () => {
      setError(false);
      setLoadingLeaderboard(true);
      try {
        const data = await fetch("/api/crossword/get-leaderboards", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (data.status !== 200) {
          setError(true);
        }

        const json = await data.json();
        const leaderboardsResponse = json["leaderboards"];
        setLeaderboard(leaderboardsResponse);
      } catch (e) {
        setError(true);
      }
      setLoadingLeaderboard(false);
    };

    getLeaderboards();
  }, []);

  return (
    <>
      <Head>
        <title>Mini Crossword</title>
        <meta
          name="description"
          content="NYT Mini Crossword Stats With Friends"
        />
        <meta property="og:image" content="/crosswordog.png" />
      </Head>
      <VStack spacing="20px">
        <Heading>~ Mini Crossword Stats With Friends ~</Heading>
        <Flex>
          <Text>Now we can see how we stack up historically!</Text>
          <PopCitation>
            See also NYT api reversing on{" "}
            <Link
              className="md-link"
              href="https://observablehq.com/@observablehq/nyt-minis"
            >
              observable
            </Link>{" "}
            and{" "}
            <Link className="md-link" href="https://xwstats.com/stats">
              xwstats
            </Link>{" "}
            for big crossword stats.
          </PopCitation>
        </Flex>
        <Text>
          For instructions on how to get your NYT cookie, see{" "}
          <Link className="md-link" href="/projects/crossword/how-to">
            how to get your new york times cookie
          </Link>
        </Text>

        <Text>
          To join a leaderboard, go to the leaderboard page and enter your NYT
          cookie.
        </Text>

        <Box maxW="100%" overflowX="hidden">
          {loadingLeaderboard ? (
            <Spinner />
          ) : (
            <Box maxW="calc(100vw - 2.5rem)" overflowX="auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>leaderboard</Th>
                    <Th>num. players</Th>
                    <Th>Password?</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {leaderboard.map(
                    (leaderboardItem: LeaderboardItemResponse, index) => (
                      <Tr key={index}>
                        <Td>
                          <Link
                            className="md-link"
                            href={
                              "/projects/crossword/leaderboard/" +
                              leaderboardItem.id
                            }
                          >
                            {leaderboardItem.name}
                          </Link>
                        </Td>
                        <Td>{leaderboardItem.user_count}</Td>
                        <Td>
                          {leaderboardItem.is_password_protected ? "🔒" : "No"}
                        </Td>
                      </Tr>
                    )
                  )}
                </Tbody>
              </Table>
            </Box>
          )}
        </Box>
        <Button
          onClick={() => setShowCreateLeaderboard(!showCreateLeaderboard)}
        >
          Create new leaderboard
        </Button>
        {showCreateLeaderboard && <CrosswordCreateRoom />}

        <Box>
          <Heading size="md">See Also</Heading>
          <Box>
            <Link
              className="md-link"
              href="https://github.com/sinakhalili/sinakhalili.com"
            >
              The code on github
            </Link>
            <Text>
              Unfortunately it&apos;s not a neat little package, it&apos;s a
              part of this website&apos;s codebase, but if you search for
              crossword in the repo you&apos;ll find it.
            </Text>
          </Box>
        </Box>
      </VStack>
    </>
  );
}
