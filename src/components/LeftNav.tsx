import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  ListIcon,
  SlideFade,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { CoolLink } from "./CoolLink";
import { SinaHead } from "./SinaHead";
import { LeftNavAccordion } from "./LeftNavAccordion";
import { useRef } from "react";
import Link from "next/link";
import { HamburgerIcon } from "@chakra-ui/icons";

interface INavItem {
  title: string;
  href: string;
  more?: {
    title: string;
    href: string;
  }[];
}

const leftNavData: INavItem[] = [
  {
    title: "home",
    href: "/",
  },
  {
    title: "posts",
    href: "/posts",
    // more: [ // TODO: add this back when I have more posts
    //   {
    //     title: "all",
    //     href: "/posts",
    //   },
    //   {
    //     title: "tech",
    //     href: "/posts/tech",
    //   },
    //   {
    //     title: "life",
    //     href: "/posts/life",
    //   },
    // ],
  },
  {
    title: "reading",
    href: "/reading",
  },
  {
    title: "projects",
    href: "/projects",
    more: [
      {
        title: "mini crossword",
        href: "/projects/crossword",
      },
    ],
  },
  {
    title: "quotes",
    href: "/quotes",
  },
  {
    title: "about",
    href: "/about",
  },
  // {
  //   title: "my stack",
  //   href: "/stack",
  // },
];

export const LeftNav = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef(null);

  if (!isDesktop) {
    return (
      <>
        <Flex
          w="100%"
          bgColor="brand.100"
          p={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text
            fontFamily="charter"
            fontWeight="bold"
            fontSize="xl"
            flexGrow={1}
            w="100%"
          >
            <Image
              src="/favicon.ico"
              alt="Sina Khalili"
              w="30px"
              display="inline-block"
              mr={2}
            />
            <Link href="/">sinakhalili.com</Link>
          </Text>

          <Button
            ref={ref}
            onClick={onOpen}
            variant="unstyled"
            w="fit-content"
            px={3}
          >
            <HamburgerIcon />
          </Button>
        </Flex>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <VStack p={3} bgColor="brand.100" h="100%">
              <SinaHead />
              {leftNavData.map((item, index) => (
                <CoolLink key={index} href={item.href}>
                  {item.more && <LeftNavAccordion item={item} />}
                  {!item.more && <Text py={1}>{item.title}</Text>}
                </CoolLink>
              ))}
            </VStack>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <VStack p={3} bgColor="brand.100" h="100%">
      <SinaHead />
      {leftNavData.map((item, index) => (
        <CoolLink key={index} href={item.href}>
          {item.more && <LeftNavAccordion item={item} />}
          {!item.more && <Text py={1}>{item.title}</Text>}
        </CoolLink>
      ))}
    </VStack>
  );
};
