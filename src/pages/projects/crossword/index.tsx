import { PopCitation } from "@/components/PopCitation";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
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
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersWithStats, setUsersWithStats] = useState([]);

  const handleNewCookie = async () => {
    setError(false);
    setLoadingUsers(true);
    try {
      const data = await fetch("/api/crossword/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cookie: input }),
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
      setLoadingUsers(true);
      const data = await fetch("/api/crossword/refresh", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.status !== 200) {
        setError(true);
      }
      window.location.reload();
    } catch (e) {
      setError(true);
    }
  };

  const handleGetUsers = async () => {
    setError(false);
    try {
      const data = await fetch("/api/crossword/get-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.status !== 200) {
        setError(true);
      }

      const json = await data.json();
      console.log(json);
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    const handleGetStats = async () => {
      setError(false);
      try {
        const data = await fetch("/api/crossword/get-stats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ users: users }),
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
      setError(false);
      setLoadingUsers(true);
      try {
        const data = await fetch("/api/crossword/get-users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (data.status !== 200) {
          setError(true);
        }

        const json = await data.json();
        const crosswordUsers = json["users"];
        const stats = await handleGetStats();

        const usersWithStats = crosswordUsers.map(
          (user: { user_id: string; username: string }) => {
            const item = stats.find(
              (stat: { id: string }) => stat.id === user.user_id
            );

            return {
              ...user,
              ...item,
            };
          }
        );

        // sort by first place finishes
        usersWithStats.sort((a: CrosswordUser, b: CrosswordUser) => {
          if (a.first_place_finishes > b.first_place_finishes) {
            return -1;
          } else if (a.first_place_finishes < b.first_place_finishes) {
            return 1;
          } else {
            return 0;
          }
        });

        setUsersWithStats(usersWithStats);
      } catch (e) {
        setError(true);
      }
      setLoadingUsers(false);
    };

    getUsers();
  }, [users]);

  return (
    <VStack spacing="20px">
      <Head>
        <title>Mini Crossword</title>
      </Head>
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
      <Text fontWeight="bold">Enter your NYT Cookie</Text>
      <Flex w="100%">
        <Input
          placeholder="2E4eY0SzN9G6HQTSdA8WP74J.tI2RqE7BK7GTLQeGjHJNp..."
          borderRadius="none"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          w="100%"
        />
        <Button borderRadius="none" onClick={handleNewCookie}>
          Submit
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

      {loadingUsers ? (
        <Spinner />
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>name</Th>
              <Th>1st place</Th>
              <Th>2nd place</Th>
              <Th>Total attempts</Th>
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
                <Td>{user.first_place_finishes} 🏅</Td>
                <Td>{user.second_place_finishes} 🥈</Td>
                <Td>{user.total_solves_attempted}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* <Heading>Stats for nerds</Heading> */}
    </VStack>
  );
}
