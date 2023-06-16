import { DownloadIcon } from "@chakra-ui/icons";
import {
  Box,
  Image,
  Menu,
  MenuItem,
  MenuList,
  ScaleFade,
  SlideFade,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import partyjs from "party-js";
import { useEffect, useRef, useState } from "react";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

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

  const handleContextMenu = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!ref.current) return;
    e.preventDefault();
    onOpen();

    const menuWidth = 200; // Adjust this value as needed
    const menuHeight = 40; // Adjust this value as needed

    const posX = e.clientX;
    const posY = e.clientY;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const left1 =
      posX + menuWidth > windowWidth ? windowWidth - menuWidth : posX;
    const top1 =
      posY + menuHeight > windowHeight ? windowHeight - menuHeight : posY;

    setLeft(left1);
    setTop(top1);
  };

  return (
    <>
      <Image
        src={head?.src || "/sina_hoodie.png"}
        alt="logo"
        p={3}
        h="170px"
        transition="all 0.3s"
        _hover={{
          transform: "scale(1.05)",
        }}
        _active={{
          transform: "scale(0.9)",
        }}
        ref={ref}
        onContextMenu={handleContextMenu}
      />
      <Box position="fixed" left={left} top={top} zIndex="9999">
        <Menu isOpen={isOpen} onClose={onClose}>
          <MenuList>
            <MenuItem
              icon={<DownloadIcon />}
              onClick={() => {
                if (!ref.current) return;
                const canvas = document.createElement("canvas");
                canvas.width = 200;
                canvas.height = 200;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                  ctx.drawImage(ref.current, 0, 0, 170, 170);

                  canvas.toBlob((blob) => {
                    const item = new ClipboardItem({ "image/png": blob! });
                    navigator.clipboard.write([item]);
                  });
                }
              }}
            >
              copy image but slightly flattened (for no reason)
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};
