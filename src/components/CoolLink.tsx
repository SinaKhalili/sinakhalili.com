import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ICoolLinkProps {
  href: string;
  children: React.ReactNode;
  title?: string;
}

function isCurrentPath(path: string, href: string) {
  path = path.split("/")[1];
  href = href.split("/")[1];
  return path === href;
}

export const CoolLink = ({ href, children, title }: ICoolLinkProps) => {
  const router = useRouter();

  return (
    <ChakraLink
      as={NextLink}
      href={href}
      _hover={{
        textDecoration: "none",
        transform: "scale(1.03)",
        shadow: "lg",
        bgColor: "white",
      }}
      _active={{
        transform: "scale(0.95)",
      }}
      title={title}
      w="100%"
      p={2}
      borderRadius={5}
      shadow={isCurrentPath(router.pathname, href) ? "lg" : "none"}
      transition="all 0.3s"
      backgroundColor={
        isCurrentPath(router.pathname, href) ? "white" : "transparent"
      }
    >
      {children}
    </ChakraLink>
  );
};
