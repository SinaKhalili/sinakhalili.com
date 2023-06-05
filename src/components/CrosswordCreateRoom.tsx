import { Box, Text, Heading, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

export const CrosswordCreateRoom = () => {
  const [name, setName] = useState("");
  const [cookie, setCookie] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleCreate = async () => {
    setError(false);
    const data = await fetch("/api/crossword/create-leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, cookie, password }),
    });

    if (data.status !== 200) {
      console.log("error");
      setError(true);
    }
    window.location.reload();
  };

  return (
    <Box p={3} bgColor="gray.200" borderRadius={10} w="100%">
      <Heading>Create Leaderboard</Heading>
      <Text mt={3} mb={1}>
        Leaderboard Name
      </Text>
      <Input
        bgColor="white"
        value={name}
        placeholder="cruciverbalist vegans"
        onChange={(e) => setName(e.target.value)}
      />
      <Text mt={3} mb={1}>
        Your New York Times Cookie
      </Text>
      <Input
        bgColor="white"
        value={cookie}
        placeholder="2E4eY0SzN9G6HQTSdAp..."
        onChange={(e) => setCookie(e.target.value)}
      />
      <Text mt={3} mb={1}>
        Add password (optional)
      </Text>
      <Input
        bgColor="white"
        value={password}
        placeholder="leave blank for no password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleCreate} w="100%" colorScheme="blackAlpha" my={2}>
        Create
      </Button>
      {error && (
        <Text color="red.500">
          Something went wrong. (Is the name unique?) Please try again.
        </Text>
      )}
    </Box>
  );
};
