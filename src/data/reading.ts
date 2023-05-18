export interface BookData {
  title: string;
  author: string;
  cover?: string;
}

export const CurrentlyReadingData: BookData[] = [
  {
    title: "Object Oriented Ontology",
    author: "Graham Harman",
    cover: "/bookcovers/OOO.jpg",
  },
  {
    title: "Computer Power and Human Reason",
    author: "Joseph Weizenbaum",
    cover: "/bookcovers/compandhr.jpg",
  },
];

export const RecentlyReadData: BookData[] = [
  {
    title: "Exhalation",
    author: "Ted Chiang",
    cover: "/bookcovers/exhalation.jpg",
  },
  {
    title: "The Prophet",
    author: "Kahlil Gibran",
    cover: "/bookcovers/theprophet.jpg",
  },
];

export const FavoriteBooksData: BookData[] = [
  {
    title: "The Information",
    author: "James Gleick",
  },
  {
    title: "The Annotated Turing",
    author: "Charles Petzold",
  },
  {
    title: "The Know-It-All",
    author: "A.J. Jacobs",
  },
  {
    title: "Makers",
    author: "Cory Doctorow",
  },
  {
    title: "Infinite Jest",
    author: "David Foster Wallace",
  },
  {
    title: "CLOSURE",
    author: "_why the lucky stiff",
  },
  {
    title: "Why's (Poignant) Guide to Ruby",
    author: "_why the lucky stiff",
  },
  {
    title: "Gödel, Escher, Bach",
    author: "Douglas Hofstadter",
  },
  {
    title: "Harry Potter and the Methods of Rationality",
    author: "Eliezer Yudkowsky",
  },
];

export const BooksThatHauntMe: BookData[] = [
  {
    title: "Two Arms and a Head",
    author: "Clayton Atreus",
  },
  {
    title: "Fanged Noumena",
    author: "Nick Land",
  },
  {
    title: "Watchmen",
    author: "Alan Moore",
  },
  {
    title: "Infinite Jest (again)",
    author: "David Foster Wallace",
  },
];
