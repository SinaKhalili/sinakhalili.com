import { ChaterGame } from "@/lib/chatr/engine";
import {
  globalObjects,
  map,
  startingLine,
  startingLocation,
} from "@/lib/chatr/levels/data";
import { parseMessage } from "@/lib/chatr/utils";
import {
  Text,
  Box,
  Heading,
  Image,
  VStack,
  Flex,
  Input,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const getReplyFromTerminal = (input: string, game: ChaterGame) => {
  const reply = game.getAnswer(input);
  return reply;
};

const YourCody = ({ message }: { message: string }) => {
  return (
    <Flex alignItems="center">
      <Text> {"->"} </Text>
      <Image width="60px" src="/cody_face.png" alt="Cody" />
      <Text fontFamily="mono"> {message}</Text>
    </Flex>
  );
};

const TypeWriter = ({ text }: { text: string }) => {
  const [parent, enableAnimations] = useAutoAnimate();

  return (
    <Box>
      <Box
        dangerouslySetInnerHTML={{
          __html: text,
        }}
        ref={parent}
      ></Box>
      <Box marginTop="40px"> </Box>
    </Box>
  );
};

const getRandomCodyMessage = () => {
  const possibleMessages = [
    "nice job!",
    "hmm...",
    "its really picking up",
    "we are gonna make it",
    "hi",
    "go on...",
    "vibes are off here",
    "crypto moment",
    "coding moment",
    "i like this",
    "i dont like this",
    "by now you must realize that other than the first message, all of these are random... or are they...",
    "now there is a lot of text",
  ];

  const randomIndex = Math.floor(Math.random() * possibleMessages.length);
  return possibleMessages[randomIndex];
};

const WINING_LINE = "happy birthday c0dy";

export default function Makaseff() {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const [textGameContents, setTextGameContents] = useState("");
  const [userDidWin, setUserDidWin] = useState(false);
  const [codyMessage, setCodyMessage] = useState(
    "< Try typing `look around` or `help` for help!"
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleScroll = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const game = useMemo(() => {
    let g = new ChaterGame(
      map,
      globalObjects,
      startingLocation,
      [],
      startingLine
    );
    return g;
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [textGameContents]);

  const handleTerminalKeypress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      if (value === WINING_LINE) {
        setUserDidWin(true);
        return;
      }
      const reply = getReplyFromTerminal(value, game);
      let parsedReply = parseMessage(reply);

      setTextGameContents((prev) => prev + parsedReply);
      setValue("");
      handleScroll();
      setCodyMessage(getRandomCodyMessage());
    }
  };
  return (
    <VStack spacing="20px" h={["100vh", "auto"]}>
      <Head>
        <title>Makaseff</title>
      </Head>
      <Heading>its Cody Time: the literary game</Heading>
      {userDidWin && (
        <Box>
          <YourCody message="you won!!!!!! happy birthday c0dy" />
          <Flex>
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
          </Flex>
          <YourCody message="you won!!!!!! happy birthday c0dy" />
          <Flex>
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
          </Flex>
          <YourCody message="you won!!!!!! happy birthday c0dy" />
          <Flex>
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
          </Flex>
          <YourCody message="you won!!!!!! happy birthday c0dy" />
          <Flex>
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
          </Flex>
          <YourCody message="you won!!!!!! happy birthday c0dy" />
          <YourCody message="you won!!!!!! happy birthday c0dy" />
          <Flex>
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
          </Flex>
          <YourCody message="you won!!!!!! happy birthday c0dy" />
          <YourCody message="you won!!!!!! happy birthday c0dy" />
          <Flex>
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
            <Image width="60px" src="/computer_dance.gif" alt="Cody" />
          </Flex>
          <YourCody message="you won!!!!!! happy birthday c0dy" />
        </Box>
      )}
      {!userDidWin && (
        <Box>
          <TypeWriter text={textGameContents} />
          <YourCody message={codyMessage} />
          <Input
            ref={ref}
            variant="unstyled"
            size="lg"
            fontSize="3vh"
            color="#005200"
            placeholder="Type command here"
            value={value}
            onChange={handleChange}
            onKeyDown={handleTerminalKeypress}
            autoFocus
            marginBottom="10px"
          />
        </Box>
      )}
    </VStack>
  );
}
