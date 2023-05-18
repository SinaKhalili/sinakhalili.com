import { extendTheme } from "@chakra-ui/react";

import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

const charter = localFont({
  src: [
    {
      path: "./pages/fonts/charter_regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./pages/fonts/charter_bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./pages/fonts/charter_italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./pages/fonts/charter_bold_italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#ffb090",
      900: "#1a202c",
    },
  },
  fonts: {
    charter: charter.style.fontFamily,
    heading: charter.style.fontFamily,
    body: inter.style.fontFamily,
    p: inter.style.fontFamily,
  },
  styles: {
    global: {
      body: {
        bg: "brand.100",
      },
      h1: {
        marginBottom: "1rem",
      },
      h2: {
        marginBottom: "1rem",
      },
      ".md-link": {
        transition: "all 0.2s ease-in-out",
        color: "blue.600",
        _hover: {
          backgroundColor: "blue.600",
          color: "white",
          outline: "5px solid blue",
        },
      },
      ".nav-link": {
        transition: "all 0.2s ease-in-out",
        color: "black",
        _hover: {
          backgroundColor: "blue.600",
          color: "white",
          outline: "5px solid blue",
        },
      },
      ".md-listitem": {
        marginBottom: "0.5rem",
        listStylePosition: "inside",
      },
    },
  },
});
