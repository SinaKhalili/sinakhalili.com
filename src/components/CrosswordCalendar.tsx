import { formatDateToEnglish } from "@/lib/crossword";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface LeaderboardData {
  [solveDate: string]: {
    username: string;
    seconds_spent_solving: number;
    rank: string;
    solve_date: string;
  }[];
}

function groupBySolveDate(data: any[]): Record<string, any[]> {
  return data.reduce((acc, obj) => {
    const solveDate = obj.solve_date.split("T")[0];

    if (acc.hasOwnProperty(solveDate)) {
      acc[solveDate].push(obj);
    } else {
      acc[solveDate] = [obj];
    }

    return acc;
  }, {});
}

function sortGroupedData(
  groupedData: Record<string, any[]>
): Record<string, any[]> {
  const sortedGroupedData: Record<string, any[]> = {};
  const sortedKeys = Object.keys(groupedData).sort((a, b) => {
    const aDate = new Date(a);
    const bDate = new Date(b);
    return bDate.getTime() - aDate.getTime();
  });
  sortedKeys.forEach((key) => {
    sortedGroupedData[key] = groupedData[key];
  });

  return sortedGroupedData;
}

function formatSolveData(data: any[]) {
  const groupedData = groupBySolveDate(data);
  const sortedGroupedData = sortGroupedData(groupedData);
  return sortedGroupedData;
}

export const CrosswordCalendar = ({ id }: { id: string }) => {
  const [error, setError] = useState(false);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardData>({});

  useEffect(() => {
    const getMonthlyLeaderboard = async () => {
      setError(false);
      try {
        if (!id) return;
        // get the day like YYYY-MM-DD
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const data = await fetch("/api/crossword/get-monthly-leaderboard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id, day: `${year}-${month}-${day}` }),
        });

        if (data.status !== 200) {
          setError(true);
        }

        const json = await data.json();
        const formatted = formatSolveData(json["data"]);
        setLeaderboard(formatted);
      } catch (e) {
        console.log(e);
        setError(true);
      }
    };
    getMonthlyLeaderboard();
  }, [id]);

  return (
    <Box w="100%">
      <Heading>Calendar</Heading>
      <Box>
        <Box display="flex" flexWrap="wrap">
          {Object.keys(leaderboard).map((solveDate) => (
            <Box
              key={solveDate}
              border="1px solid black"
              m={2}
              px={3}
              py={2}
              borderRadius="10px"
            >
              <Heading size="sm">{formatDateToEnglish(solveDate)}</Heading>
              {leaderboard[solveDate].map((item) => (
                <Box key={item.username} paddingY={2}>
                  <Text>
                    {item.username} - {item.seconds_spent_solving}
                  </Text>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
