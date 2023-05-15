import { BookData } from "@/data/reading";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

interface IBookListTableProps {
  books: BookData[];
}

export const BookListTable = ({ books }: IBookListTableProps) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Author</Th>
        </Tr>
      </Thead>
      <Tbody>
        {books.map((book, index) => (
          <Tr key={index}>
            <Td fontFamily="charter" fontSize="lg">
              {book.title}
            </Td>
            <Td fontStyle="italic">{book.author}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
