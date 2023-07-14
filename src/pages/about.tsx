import { Text, Box, Heading, Image, VStack, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <VStack spacing="20px" h={["100vh", "100vh"]}>
      <Head>
        <title>About</title>
      </Head>
      <Heading>About</Heading>
      <Text>As seen on the internet</Text>
      <Flex>
        <Link className="md-link" href="https://github.com/sinakhalili">
          sinakhalili
        </Link>
        <Text mx="10px">|</Text>
        <Link className="md-link" href="https://twitter.com/sinathagreat">
          @sinathagreat
        </Link>
        <Text mx="10px">|</Text>
        <Link className="md-link" href="https://youtube.com/@k0p">
          youtube channel
        </Link>
      </Flex>
      <Image
        src="/appearances.png"
        alt="Sina"
        aspectRatio={1 / 1}
        objectFit="cover"
        borderRadius="10%"
        maxW="400px"
      />
    </VStack>
  );
}
