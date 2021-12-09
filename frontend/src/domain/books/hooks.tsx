import { useQuery } from 'react-query';
import axios from 'axios';

async function fetchBooks() {
  const { data } = await axios.get('http://localhost:4000/books/');
  return data;
}

const useGetItems = () => useQuery('books', fetchBooks);

export default useGetItems;
