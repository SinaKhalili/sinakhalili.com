import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Link,
  Text,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface IPopCitationProps {
  children?: React.ReactNode;
}

export const PopCitation = ({ children }: IPopCitationProps) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!loaded) return null;
  return (
    <Box display="inline-block">
      <Popover trigger="hover">
        <PopoverTrigger>
          <Link color="blue" mx="2px" fontSize="xs">
            [note]
          </Link>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Text fontWeight="normal" fontFamily="inter" fontSize="sm">
              {children}
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
