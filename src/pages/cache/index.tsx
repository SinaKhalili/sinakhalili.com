import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function About() {
  return (
    <VStack spacing="20px">
      <Heading>Cache</Heading>
      <Text>
        You ever see a post and links out to a non-existent page? A 404 page -
        or worse - a silent redirect to homepage!
      </Text>
      <Text>
        I hate that. lol. Anyways I&apos;m trying to avoid that here. I also
        really like what{" "}
        <Link href="https://gwern.net/" className="md-link">
          Gwern Branwen
        </Link>{" "}
        has to say about the{" "}
        <Link href="https://gwern.net/archiving" className="md-link">
          importance of archiving{" "}
        </Link>
        .
      </Text>
    </VStack>
  );
}
