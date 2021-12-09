import { useGetItems } from './hooks';

export interface BooksListProps {
  books?: string[];
}

export function BooksList(props: BooksListProps) {
  const res = useGetItems();
  console.log('res', res);

  return (
    <>
      <div>hello {props.books?.join()}</div>
      {res.data?.map((b: any) => (
        <div>{b.name}</div>
      ))}
    </>
  );
}
