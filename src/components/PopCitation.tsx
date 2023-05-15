import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Link,
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
    <Popover trigger="hover">
      <PopoverTrigger>
        <Link color="blue" mx="2px" fontSize="xs">
          [note]
        </Link>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
