import {
  ChartComponent,
  ChartCrosswordStats,
} from "@/components/ChartComponent";
import { ChartCrosswordStats2 } from "@/components/ChartComponent2";
import { CrosswordStatCard } from "@/components/CrosswordStatCard";
import {
  formatDateToEnglish,
  formatSecondsToTime,
  getSorted,
  getWeekdayName,
  toNytURL,
} from "@/lib/crossword";
import { Board, SolveInfo } from "@/lib/crossword/types";
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type UserInfo = {
  username: string;
  created_at: string;
  id: string;
};

export default function CrosswordUserPage() {
  const router = useRouter();
  const { id } = router.query;

  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [solveInfo, setSolveInfo] = useState<SolveInfo[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getSolves = async () => {
      if (!id) return;
      setIsError(false);
      const res = await fetch(`/api/crossword/get-solves`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const json = await res.json();

      if (json["error"] || res.status !== 200) {
        setIsError(true);
        return;
      }
      setIsError(false);
      const data = json["data"];
      //   sort the data by ["puzzle id"["date"]

      data.sort(
        (
          a: { [x: string]: { [x: string]: number } },
          b: { [x: string]: { [x: string]: number } }
        ) => {
          if (a["puzzle_id"]["date"] < b["puzzle_id"]["date"]) {
            return 1;
          }
          if (a["puzzle_id"]["date"] > b["puzzle_id"]["date"]) {
            return -1;
          }
          return 0;
        }
      );

      setSolveInfo(data);
    };

    const getInfo = async () => {
      if (!id) return;
      setIsError(false);
      const res = await fetch(`/api/crossword/get-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const json = await res.json();

      if (json["error"] || res.status !== 200) {
        setIsError(true);
        return;
      }
      setIsError(false);
      setUserInfo(json["data"]);

      await getSolves();
    };
    getInfo();
  }, [id]);

  if (isError)
    return <Heading color="red.700">Something went wrong :(</Heading>;
  if (!userInfo)
    return (
      <Heading>
        Loading... <Spinner />{" "}
      </Heading>
    );

  return (
    <Box>
      <Box mx={[7, 3, 1, 0]}>
        <Box m={2}>
          <Heading>{userInfo["username"]}</Heading>
          <Text my={5}>
            Joined the sinakhalili.com leaderboards on{" "}
            {formatDateToEnglish(userInfo["created_at"].split("T")[0])}
          </Text>
        </Box>
        <Box my={5}>
          <Flex>
            <CrosswordStatCard
              solveInfo={getSorted(solveInfo)[0]}
              text="Best time"
            />
            <CrosswordStatCard
              solveInfo={getSorted(solveInfo).at(-1)}
              text="Worst time"
            />
            <CrosswordStatCard
              solveInfo={
                getSorted(solveInfo)[
                  Math.floor(getSorted(solveInfo).length / 2)
                ]
              }
              text="Median time"
            />
          </Flex>
          <ChartCrosswordStats solveInfo={solveInfo} />
          <ChartCrosswordStats2 solveInfo={solveInfo} />
        </Box>
        <Heading size="md">Solve History</Heading>
        <Text>🟠 - sub 1 🟡 - sub 40 🟢 - sub 30</Text>
      </Box>
      <Box overflowX="scroll">
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Day</Th>
              <Th>Time</Th>
              <Th>Board</Th>
            </Tr>
          </Thead>
          <Tbody>
            {solveInfo.map((solve, index) => (
              <Tr key={index}>
                <Td>{formatDateToEnglish(solve["puzzle_id"]["date"])}</Td>
                <Td>{getWeekdayName(solve["puzzle_id"]["date"])}</Td>
                <Td>{formatSecondsToTime(solve["seconds_spent_solving"])}</Td>
                <Td>
                  <Link
                    className="md-link"
                    href={toNytURL(solve["puzzle_id"]["date"])}
                  >
                    Visit puzzle
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
