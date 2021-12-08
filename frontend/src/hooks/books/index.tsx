import { useQuery } from 'react-query';
import axios from 'axios';

export const useGetItems = () => useQuery('lists', fetchBooks);

async function fetchBooks() {
  const { data } = await axios.get('http://localhost:4000/books/');
  return data;
}
