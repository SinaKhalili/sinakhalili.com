import { PopCitation } from "@/components/PopCitation";
import {
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

export default function HowTo() {
  return (
    <VStack spacing="20px">
      <Head>
        <title>Crossoword How-To</title>
      </Head>
      <Heading>~ How to get your New York Times cookie ~</Heading>
      <Text>
        Here is a step by step tutorial for getting your New York Times
        crossword cookie
        <PopCitation>
          Note that you must be on a desktop for this to work
        </PopCitation>
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
            In the console, enter the following code:
            <Text as="code" display="block" p={2} bg="gray.100">
              {
                "document.cookie.split('; ').find(r => r.startsWith('NYT-S')).split('=')[1]"
              }
            </Text>
          </ListItem>
          <ListItem>
            Press <Kbd>Enter</Kbd> to run the code. This will output a long
            string of letters and numbers like:
            <Text as="code" display="block" p={2} bg="gray.100">
              abC90DeFGhI12dJKLsf680MnoP45Q6r7St9uVwXyZ123...
            </Text>
          </ListItem>
          <ListItem>
            Copy that string of letters and numbers. That is your New🍪🍪
            York🍪🍪 Times crossword cookie!!!! 🎉🍪🍪🍪🍪
          </ListItem>
        </OrderedList>
        That&apos;s it! Now you can enter that cookie on
        <Link href="/projects/crossword" className="md-link">
          {" "}
          the crossword page
        </Link>{" "}
        to get your mini stats
      </Text>
    </VStack>
  );
}
