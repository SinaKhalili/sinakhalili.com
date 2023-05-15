import { Box } from "@chakra-ui/react";
import Link from "next/link";

interface IRecentItemProps {
  title: string;
  link: string;
}

export const RecentItem = ({ title, link }: IRecentItemProps) => {
  return (
    <Box my={3}>
      <Link className="md-link" href={link}>
        {title}
      </Link>
    </Box>
  );
};
