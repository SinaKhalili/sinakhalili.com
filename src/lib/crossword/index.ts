import { getSolves } from "@/db/crossword";
import { SolveInfo } from "./types";

export const NYT_API_ROOT = "https://nyt-games-prd.appspot.com/svc/crosswords";
export const LEADERBOARD_URL = `${NYT_API_ROOT}/v6/leaderboard/mini.json`;

export const getCrosswordUser = async (cookie: string) => {
  cookie = cookie.replace(/^"(.*)"$/, "$1");
  cookie = cookie.replace(/^'(.*)'$/, "$1");

  const result = await fetch(LEADERBOARD_URL, {
    method: "GET",
    headers: {
      Cookie: `NYT-S=${cookie}`,
    },
    credentials: "include",
  });
  const data = await result.json();

  if (!result.ok) {
    console.log(data);
    console.log(`Failed to add crossword user: ${result.statusText}`);
    throw new Error(`Failed to add crossword user: ${result.statusText}`);
  }

  const users = data["data"];
  const user = users.find((user: any) => {
    return user["me"] === true;
  });

  if (!user) {
    throw new Error(`Failed to add crossword user: ${result.statusText}`);
  }

  return user;
};

const getQuarters = () => {
  const starts = [];
  const today = new Date();
  const startDate = new Date();
  startDate.setUTCFullYear(today.getUTCFullYear() - 1);

  let currentQuarterStart = startDate;
  while (currentQuarterStart < today) {
    starts.push(currentQuarterStart);
    const nextQuarterStart = new Date(
      currentQuarterStart.getUTCFullYear(),
      currentQuarterStart.getUTCMonth() + 3,
      1
    );
    currentQuarterStart = nextQuarterStart;
  }

  const quarters = starts.map((start) => {
    const end = new Date(start.getUTCFullYear(), start.getUTCMonth() + 3, 0);
    return [start, end];
  });

  return quarters;
};

export const getHistoricalMiniCrosswordDataNYT = async (
  cookie: string,
  begin_date: Date,
  end_date: Date
) => {
  const formattedBeginDate = begin_date.toISOString().split("T")[0];
  const formattedEndDate = end_date.toISOString().split("T")[0];

  const historicalEndpoint = `${NYT_API_ROOT}/v3/undefined/puzzles.json?publish_type=mini&date_start=${formattedBeginDate}&date_end=${formattedEndDate}`;
  const result = await fetch(historicalEndpoint, {
    method: "GET",
    headers: {
      Cookie: `NYT-S=${cookie}`,
    },
    credentials: "include",
  });
  const data = await result.json();
  return data;
};

export const getMiniCrosswordDataNYT = async (cookie: string) => {
  const quarters = getQuarters();
  let allData: any[] = [];

  await Promise.all(
    quarters.map(async (quarter) => {
      const [begin_date, end_date] = quarter;
      const data = await getHistoricalMiniCrosswordDataNYT(
        cookie,
        begin_date,
        end_date
      );
      allData.push(...data.results);
    })
  );

  return allData;
};

export function formatDateToEnglish(dateString: string | undefined): string {
  if (!dateString) return "N/A";
  const date = new Date(dateString);

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  } as any;
  return date.toLocaleDateString("en-US", options);
}

export function getWeekdayName(dateString: string): string {
  const date = new Date(dateString);
  const options = { weekday: "long", timeZone: "UTC" } as any;
  return date.toLocaleDateString("en-US", options);
}

export function formatSecondsToTime(seconds: number | undefined): string {
  if (!seconds) return "...";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  if (minutes < 60) {
    return `${getEmojiForTime(
      seconds
    )} ${formattedMinutes}:${formattedSeconds}`;
  } else {
    const hours = Math.floor(minutes / 60);
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} `;
  }
}

export function getEmojiForTime(seconds: number) {
  if (seconds < 30) {
    return "🟢";
  } else if (seconds < 40) {
    return "🟡";
  } else if (seconds < 60) {
    return "🟠";
  } else {
    return "";
  }
}

export function toNytURL(date: string | undefined) {
  if (!date) return "";
  return `https://www.nytimes.com/crosswords/game/mini/${date
    .replaceAll(" ", "")
    .replaceAll("-", "/")}`;
}

export function getSorted(
  solveInfo: SolveInfo[] | null,
  day: string | null = null
): SolveInfo[] {
  if (!solveInfo) return [];
  solveInfo = solveInfo.filter((info) => info.seconds_spent_solving !== null);
  let filtered = solveInfo;
  if (day) {
    filtered = [...solveInfo].filter((info) => {
      const puzzleDate = new Date(info.puzzle_id.date);
      // day will be like "saturday" or "sunday"
      return (
        day.toLowerCase() ===
        puzzleDate
          .toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" })
          .toLowerCase()
      );
    });
  }
  const sorted = [...filtered].sort((a, b) => {
    return a.seconds_spent_solving - b.seconds_spent_solving;
  });

  return sorted;
}
