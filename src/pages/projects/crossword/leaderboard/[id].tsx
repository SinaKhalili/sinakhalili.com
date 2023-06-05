import { CrosswordCalendar } from "@/components/CrosswordCalendar";
import { PopCitation } from "@/components/PopCitation";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { formatDateToEnglish } from "@/lib/crossword";
import {
  ArrowLeftIcon,
  ArrowUpIcon,
  CheckIcon,
  SpinnerIcon,
} from "@chakra-ui/icons";
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
  Spacer,
} from "@chakra-ui/react";
import { get } from "http";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type CrosswordUser = {
  username: string;
  id: string;
  first_place_finishes: number;
  second_place_finishes: number;
  total_solves_attempted: number;
};

export default function Projects() {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersWithStats, setUsersWithStats] = useState([]);
  const [leaderboardInfo, setLeaderboardInfo] = useState({
    created_at: "",
    name: "",
    id: "",
    is_password_protected: false,
  });

  const router = useRouter();
  const { id } = router.query;

  const handleNewCookie = async () => {
    setError(false);
    setLoadingUsers(true);
    try {
      const data = await fetch("/api/crossword/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cookie: input,
          leaderboard_id: id,
          password: password,
        }),
      });

      if (data.status !== 200) {
        setLoadingUsers(false);
        setError(true);
      }

      handleRefresh();
    } catch (e) {
      setLoadingUsers(false);
      setError(true);
    }
  };

  const handleRefresh = async () => {
    setError(false);
    try {
      if (!id) return;
      setLoadingUsers(true);
      const data = await fetch("/api/crossword/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ leaderboard_id: id }),
      });

      if (data.status !== 200) {
        setError(true);
      }
      window.location.reload();
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    const handleGetStats = async () => {
      setError(false);
      try {
        if (!id) return;
        const data = await fetch("/api/crossword/get-stats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ leaderboard_id: id }),
        });

        if (data.status !== 200) {
          setError(true);
        }

        const json = await data.json();
        return json["data"];
      } catch (e) {
        setError(true);
      }
    };

    const getUsers = async () => {
      if (!id) return;
      setError(false);
      setLoadingUsers(true);
      try {
        const stats = await handleGetStats();
        stats.sort((a: CrosswordUser, b: CrosswordUser) => {
          if (a.first_place_finishes > b.first_place_finishes) {
            return -1;
          } else if (a.first_place_finishes < b.first_place_finishes) {
            return 1;
          } else {
            return 0;
          }
        });

        setUsersWithStats(stats);
      } catch (e) {
        console.log(e);
        setError(true);
      }
      setLoadingUsers(false);
    };

    getUsers();
  }, [id, users]);

  useEffect(() => {
    const getLeaderboardInfo = async () => {
      setError(false);
      try {
        if (!id) return;
        const data = await fetch("/api/crossword/get-leaderboard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        });

        if (data.status !== 200) {
          setError(true);
        }

        const json = await data.json();
        setLeaderboardInfo(json["leaderboard"]);
      } catch (e) {
        setError(true);
      }
    };
    getLeaderboardInfo();
  }, [id]);

  return (
    <VStack spacing="20px">
      <Head>
        <title>
          Mini Crossword {leaderboardInfo.name ? leaderboardInfo.name : ""}
        </title>
      </Head>
      <Text></Text>
      <Flex
        w="100%"
        alignItems="center"
        justifyItems="center"
        justifyContent="space-between"
      >
        <Text fontSize="sm" m={3}>
          <Link className="md-link" href="/projects/crossword">
            <ArrowLeftIcon />
          </Link>
        </Text>
        <Heading>&nbsp;{leaderboardInfo.name}&nbsp;</Heading>
        <Text></Text>
      </Flex>

      <Text>
        a leaderboard full of intelligent people, made on{" "}
        {leaderboardInfo.created_at &&
          formatDateToEnglish(leaderboardInfo.created_at.split("T")[0])}
      </Text>

      <Text>
        For instructions on how to get your NYT cookie, see{" "}
        <Link className="md-link" href="/projects/crossword/how-to">
          how to get your new york times cookie
        </Link>
      </Text>
      {leaderboardInfo.is_password_protected && (
        <Box w="100%">
          <Text fontWeight="bold" my={2}>
            AVAST! This leaderboard is password protected
          </Text>
          <Input
            placeholder="enter password"
            borderRadius="none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            w="100%"
          />
        </Box>
      )}
      <Text fontWeight="bold">Enter your NYT Cookie and join!</Text>
      <Flex w="100%">
        <Input
          placeholder="2E4eY0SzN9G6HQTSdAp..."
          borderRadius="none"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          w="100%"
        />
        <Button borderRadius="none" onClick={handleNewCookie}>
          Join
        </Button>
      </Flex>

      <Box>
        <Button borderRadius="none" onClick={handleRefresh}>
          Refresh data
          <SpinnerIcon ml="2" />
        </Button>
      </Box>
      {error && (
        <Text color="red.500">
          Something went wrong! Please think, come up with a solution, and then
          try again
        </Text>
      )}

      <Box maxW="100%" overflowX="hidden">
        {loadingUsers ? (
          <Spinner />
        ) : (
          <Box maxW="100%" overflowX="hidden">
            <Table>
              <Thead maxW="100%" overflowX="hidden">
                <Tr maxW="100%" overflowX="hidden">
                  <Th>name</Th>
                  <Th>1st place</Th>
                  <Th>2nd place</Th>
                  <Th>total solves</Th>
                </Tr>
              </Thead>
              <Tbody>
                {usersWithStats.map((user: CrosswordUser, index) => (
                  <Tr key={index}>
                    <Td>
                      <Link
                        className="md-link"
                        href={"/projects/crossword/user/" + user.id}
                      >
                        {user.username}
                      </Link>
                    </Td>
                    <Td>{user.first_place_finishes}🏅</Td>
                    <Td>{user.second_place_finishes}🥈</Td>
                    <Td>{user.total_solves_attempted}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Box>
      <Box maxW="100%" overflowX="hidden">
        <Heading size="md">Historical leaderboards</Heading>
        {id && <CrosswordCalendar id={id as string} />}
      </Box>
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
            Unfortunately it&apos;s not a neat little package, it&apos;s a part
            of this website&apos;s codebase, but if you search for crossword in
            the repo you&apos;ll find it.
          </Text>
        </Box>
      </Box>
    </VStack>
  );
}
