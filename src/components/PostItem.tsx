import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

interface PostItemProps {
  post: any;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <Flex
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      my={3}
    >
      <Link className="md-link" href={`/posts/${post.slug}`}>
        {post.data.title}
      </Link>
      <Text fontSize="sm" as="span" mx={1} fontStyle="italic"></Text>
    </Flex>
  );
};

export default PostItem;
