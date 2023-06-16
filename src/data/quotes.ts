import { Quotey } from "@/components/Quotey";

interface IQuote {
  author: string;
  href: string;
  children: React.ReactNode;
  meta?: string;
}

export interface IAllQuotes {
  [key: string]: IQuote;
}

export const allQuotes: IAllQuotes = {
  ManuelBlumWriting: {
    author: "Manuel Blum",
    href: "https://www.cs.cmu.edu/~mblum/research/pdf/research02.txt",
    children: `
    Turing machines are incredibly more powerful than Finite Automata. Yet the
    only difference between a FA and a TM is that the TM, unlike the FA, has
    paper and pencil. Think about it. It tells you something about the power of
    writing.`,
  },
  PaulGrahamWriting: {
    author: "Paul Graham",
    href: "http://www.paulgraham.com/writing44.html",
    children: `
    Writing doesn't just communicate ideas; it generates them. If
    you're bad at writing and don't like to do it, you'll miss
    out on most of the ideas writing would have generated.`,
  },
  LamportWriting: {
    author: "Leslie Lamport",
    href: "https://www.microsoft.com/en-us/research/uploads/prod/2016/12/latex-for-everyone.pdf",
    children: `
    To think, you have to write. If you're thinking without writing, you
    only think you're thinking.`,
  },
  LautreamontSurrealUmbrella: {
    author: "Comte de Lautréamont (Isidore-Lucien Ducasse)",
    href: "https://ia902209.us.archive.org/0/items/les-chants-de-maldoror-de-lautreamont-conte-maldoror-2015-new-directions-libgen.li/%5BLes%20Chants%20de%20Maldoror%20%5D%20de%20Lautreamont%2C%20Conte%20-%20Maldoror%20%282015%2C%20New%20Directions%29%20-%20libgen.li.pdf",
    meta: "Les Chants de Maldoror, P. 205 (chapter 3)",
    children: `
    As beautiful as the chance encounter of a sewing machine and an umbrella on
    an operating table.`,
  },
  FilmMadeThreeTiems: {
    author: "Robert Bresson (Maybe, but probably not)",
    href: "https://english.stackexchange.com/questions/530511/who-originally-said-a-film-is-made-written-three-times",
    children: `
     I've discovered that a film is born three times, once when it is written. Again when it is directed. And once more when it is edited.
    `,
  },
  MontaigneQuotes: {
    author: "Michel de Montaigne",
    href: "https://books.google.ca/books?id=L-Qs6z6CWJkC&printsec=titlepage&redir_esc=y#v=onepage&q&f=false",
    children: `
      I quote others only in order the better to express myself.
    `,
  },
};
