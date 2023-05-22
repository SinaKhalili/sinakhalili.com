import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  SlideFade,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";

interface ILefNavAccordionProps {
  item: {
    title: string;
    href: string;
    more?: {
      title: string;
      href: string;
    }[];
  };
}

export const LeftNavAccordion = ({ item }: ILefNavAccordionProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isCurrentPath = (path: string, href: string) => {
    path = path.split("/")[1];
    href = href.split("/")[1];
    return path === href;
  };

  if (!item.more) return null;
  return (
    <Box>
      <Flex w="100%" justifyContent="space-between" align="center">
        <Button
          variant="unstyled"
          onClick={
            isOpen && isCurrentPath(router.pathname, item.href)
              ? onClose
              : onOpen
          }
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <Text fontWeight="normal">{item.title}</Text>
          {isOpen ? "📂" : "📁"}
        </Button>
      </Flex>
      <SlideFade in={isOpen} offsetY="20px">
        {isOpen && (
          <>
            {item.more.map((subItem, subIndex) => (
              <Link key={subIndex} className="nav-link" href={subItem.href}>
                <Text
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  _hover={{
                    color: "blue",
                  }}
                  ml={2}
                >
                  {/* is it the last item */}
                  {subIndex === item.more!.length - 1 ? "└─ " : "├─ "}
                  {subItem.title}
                </Text>
              </Link>
            ))}
          </>
        )}
      </SlideFade>
    </Box>
  );
};
