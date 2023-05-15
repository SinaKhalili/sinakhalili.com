import { Text, Heading, Image, ListItem, Flex } from "@chakra-ui/react";
import Link from "next/link";

interface MDXComponentsProps {
  [key: string]: React.ReactNode;
}

const MDXComponents = {
  p: (props: any) => <Text my={3} {...props} />,
  a: (props: any) => <Link className="md-link" {...props} />,
  h1: (props: any) => <Heading {...props} />,
  li: (props: any) => <li className="md-listitem" {...props} />,
  // eslint-disable-next-line jsx-a11y/alt-text
  img: (props: any) => <Image my={6} mx="auto" {...props} />,
};

export default MDXComponents;
