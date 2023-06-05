import { PopCitation } from "@/components/PopCitation";
import {
  Box,
  Button,
  Heading,
  Image,
  Kbd,
  ListItem,
  OrderedList,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import ReactPlayer from "react-player";

export default function HowTo() {
  return (
    <VStack spacing="20px" mx={2}>
      <Head>
        <title>Crossoword How-To</title>
      </Head>
      <Heading display="flex">
        How to get your New York Times cookie
        <PopCitation>you must be on a desktop for this to work</PopCitation>
      </Heading>

      <OrderedList mt={4} spacing={4}>
        <ListItem>
          Go to{" "}
          <Link
            href="https://www.nytimes.com/crosswords"
            target="_blank"
            className="md-link"
          >
            https://www.nytimes.com/crosswords
          </Link>{" "}
          in your web browser. This will open the New York Times crossword
          puzzle page. Login if you haven&apos;t already.
        </ListItem>
        <ListItem>
          Right click anywhere on the page and select &quot;Inspect&quot; or
          &quot;Inspect Element&quot;. This will open the developer tools
          window.
        </ListItem>
        <ListItem>
          In the developer tools window, select the &quot;Console&quot; tab.
          This is where you can enter code to interact with the web page.
          <Image src="/inspect.png" width="100%" alt="inspect" />
        </ListItem>
        <ListItem>
          In the console&apos;s input section, enter the following code:
          <Box overflowX="scroll" p={2} bg="gray.100" fontFamily="monospace">
            {
              "document.cookie.split('; ').find(r => r.startsWith('NYT-S')).split('=')[1]"
            }
          </Box>
          <Image my={2} src="/nyt_instruction.png" width="100%" alt="console" />
        </ListItem>
        <ListItem>
          Press <Kbd m={1}>Enter</Kbd> to run the code. This will output a long
          string of letters and numbers like:
          <Text my={1} as="code" display="block" p={2} bg="gray.100">
            abC90DeFGhuVwXyZ123...
          </Text>
        </ListItem>
        <ListItem>
          Copy that string of letters and numbers. This is your New York Times
          crossword cookie!!!! 🎉🍪🍪🍪🍪
        </ListItem>
      </OrderedList>
      <Text>
        That&apos;s it! Now you can enter that cookie on any leaderboard on
        <Link href="/projects/crossword" className="md-link">
          {" "}
          the crossword leaderboards page
        </Link>{" "}
        to get your mini stats
      </Text>
      <Text>Video instruction</Text>
      <ReactPlayer url="/how-to.mp4" controls={true} width="100%" />
    </VStack>
  );
}
