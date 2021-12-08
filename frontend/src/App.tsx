import './App.css';
import { BooksList } from './pages/BooksList';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BooksList books={['b1', 'b2']} />
    </QueryClientProvider>
  );
}

export default App;
