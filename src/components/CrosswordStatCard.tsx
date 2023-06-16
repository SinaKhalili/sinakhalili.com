import {
  formatDateToEnglish,
  formatSecondsToTime,
  toNytURL,
} from "@/lib/crossword";
import { Box, Link, Text } from "@chakra-ui/react";

interface ICrosswordStatCardProps {
  solveInfo: any;
  text: string;
}

export const CrosswordStatCard = ({
  solveInfo,
  text,
}: ICrosswordStatCardProps) => {
  return (
    <Box
      // omni directional box shadow
      border="1px solid #c7c5c5"
      borderRadius={5}
      p={5}
    >
      {text}{" "}
      <Text fontSize="2xl">
        {formatSecondsToTime(solveInfo?.seconds_spent_solving)}
      </Text>
      <Text mb={2}>{formatDateToEnglish(solveInfo?.puzzle_id?.date)}</Text>
      <Link className="md-link" href={toNytURL(solveInfo?.puzzle_id?.date)}>
        view puzzle
      </Link>
    </Box>
  );
};
