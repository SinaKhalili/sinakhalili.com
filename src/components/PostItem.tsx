import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

interface PostItemProps {
  post: any;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      alignItems={{ base: "flex-start", md: "center" }}
      justifyContent="space-between"
      my={3}
    >
      <Link className="md-link" href={`/posts/${post.slug}`}>
        {post.data.title}
      </Link>
      <Text fontSize="sm" as="span" opacity="0.56" fontStyle="italic">
        {post.data.publishedOn}
      </Text>
    </Flex>
  );
};

export default PostItem;
