import "react-cmdk/dist/cmdk.css";
import CommandPalette, { filterItems, getItemIndex } from "react-cmdk";
import { useState, useEffect } from "react";
import { Box, Heading, Image, Text } from "@chakra-ui/react";

const FunkyHome = () => {
  return (
    <Box display="flex" alignItems="center" width="100%">
      <Image mr={6} src="/nod.gif" alt="Nod" maxH="50px" borderRadius="full" />
      <Text>SINAKHALILI origin</Text>
    </Box>
  );
};

const CodePart = () => {
  return (
    <Box display="flex" alignItems="center" width="100%">
      <Image mr={6} src="/hand.gif" alt="Nod" maxH="50px" borderRadius="full" />
      <Text>the code</Text>
    </Box>
  );
};

const CommandBarMain = () => {
  const [page, setPage] = useState("root");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filteredItems = filterItems(
    [
      {
        heading: "CYBERNETIC ENOS",
        id: "home",
        items: [
          {
            id: "sinakhalili origin",
            children: FunkyHome(),
            href: "/about",
          },
          {
            id: "posts",
            children: "Posts",
            icon: "AcademicCapIcon",
            href: "/posts",
          },
          {
            id: "crossword",
            children: "Crossword",
            icon: "AcademicCapIcon",
            href: "/projects/crossword",
          },
          {
            id: "render",
            children: "alert('hi')",
            icon: "BanknotesIcon",
            onClick: () => {
              alert("hi");
            },
          },
        ],
      },
      {
        heading: "things and stuff",
        id: "adv4nc3d hacking",
        items: [
          {
            id: "the code",
            children: CodePart(),
            href: "https://github.com/sinakhalili/sinakhalili.com",
          },
          // {
          //   id: "Summon Dragon",
          //   children: "Summon Dragon",
          //   icon: "BanknotesIcon",
          // },
          {
            id: "privacy-policy",
            children: "Privacy policy",
            icon: "LifebuoyIcon",
            href: "https://www.fbi.gov/",
          },
          {
            id: "log-out",
            children: "Log out",
            icon: "ArrowRightOnRectangleIcon",
            onClick: () => {
              alert(`
              YOU WERE NEVER LOGGED IN TO BEGIN WITH.
              YOU WALK THROUGH A BLINDING LIGHT.
              ON THE OTHER SIDE, A BEAUTIFUL GARDEN.
              YOU THINK OF THE GEORGES BATAILLE QUOTE
              "THERE IS NO SALVATION WITHOUT DESTRUCTION,
              NO DESTRUCTION WITHOUT SUFFERING."
              YOU ARE FREE. YOU HAVE BEEN SURREALIZED.
              `);
            },
          },
        ],
      },
    ],
    search
  );

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setOpen}
      search={search}
      isOpen={open}
      page={page}
    >
      <CommandPalette.Page id="root">
        {filteredItems.length ? (
          filteredItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>
    </CommandPalette>
  );
};

export default CommandBarMain;
