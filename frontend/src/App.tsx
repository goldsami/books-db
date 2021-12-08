import './App.scss';
import { BooksList } from './domain/books/BooksList';
import { QueryClient, QueryClientProvider } from 'react-query';
import {PageNavbar} from "./components/Navbar";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <PageNavbar />
      <BooksList books={['b1', 'b2']} />
    </QueryClientProvider>
  );
}

export default App;
