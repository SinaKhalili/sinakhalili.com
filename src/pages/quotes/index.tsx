import { Box, Heading, Text } from "@chakra-ui/react";
import { IAllQuotes, allQuotes } from "@/data/quotes";
import { Quotey } from "@/components/Quotey";
import Head from "next/head";

export const getStaticProps = () => {
  return {
    props: {
      allQuotes,
    },
  };
};

interface QuotesPageProps {
  allQuotes: IAllQuotes;
}

export default function QuotesPage({ allQuotes }: QuotesPageProps) {
  return (
    <Box>
      <Head>
        <title>Quotes</title>
      </Head>
      <Heading>Quotes</Heading>
      <Text>
        Here is my small collection of quotes. Shortly after I started I
        realized there&apos;s a fine line between a quote - communicates a vibe
        - a citaiton - communicates a claim - and a reference - communicates a
        source. I&apos;ve just bundled them all as quotes here.
      </Text>
      <Box>
        {Object.values(allQuotes).map((quote, index) => (
          <Quotey key={index} author={quote.author} href={quote.href}>
            {quote.children}
          </Quotey>
        ))}
      </Box>
    </Box>
  );
}
