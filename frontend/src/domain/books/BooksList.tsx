import useGetItems from './hooks';

export interface BooksListProps {
  books?: string[];
}

const BooksList = function ({ books }: BooksListProps) {
  const res = useGetItems();
  console.log('res', res);

  return (
    <>
      <div>
        hello
        {books?.join()}
      </div>
      {res.data?.map((b: any) => (
        <div>{b.name}</div>
      ))}
    </>
  );
};

export default BooksList;
