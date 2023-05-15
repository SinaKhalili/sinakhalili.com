import { Image, ScaleFade, SlideFade } from "@chakra-ui/react";
import { useRouter } from "next/router";
import partyjs from "party-js";
import { useEffect, useRef } from "react";

const Heads = [
  {
    path: "/",
    src: "/face-1.png",
  },
  {
    path: "/about",
    src: "/face-2.png",
  },
  {
    path: "/posts",
    src: "/face-2.png",
  },
  {
    path: "/quotes",
    src: "/sina-monocle.png",
  },
  {
    path: "/reading",
    src: "/sina-books.png",
  },
  {
    path: "/projects",
    src: "/facecomputer.png",
  },
];
function isCurrentPath(path: string, href: string) {
  path = path.split("/")[1];
  href = href.split("/")[1];
  return path === href;
}

export const SinaHead = () => {
  const router = useRouter();
  const ref = useRef<HTMLImageElement>(null);

  const head = Heads.find((head) => isCurrentPath(router.pathname, head.path));

  useEffect(() => {
    const myRef = ref.current;
    if (myRef) {
      myRef.addEventListener("click", () => {
        if (myRef) partyjs.confetti(myRef);
      });
    }

    return () => {
      if (myRef) {
        myRef.removeEventListener("click", () => {
          if (myRef) partyjs.confetti(myRef);
        });
      }
    };
  }, []);

  return (
    <Image
      src={head?.src || "/sina_hoodie.png"}
      alt="logo"
      p={3}
      h="170px"
      transition={"all 0.3s"}
      _hover={{
        transform: "scale(1.05)",
      }}
      _active={{
        transform: "scale(0.9)",
      }}
      ref={ref}
    />
  );
};
