import { useGetItems } from '../hooks/books';

export interface BooksListProps {
  books: string[];
}

export function BooksList(props: BooksListProps) {
  const res = useGetItems();
  console.log('res', res);

  return (
    <div>
      <div>hello</div>
      {res.data?.map((b: any) => (
        <div>{b.name}</div>
      ))}
    </div>
  );
}
