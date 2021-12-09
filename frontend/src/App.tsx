import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BooksList from './domain/books/BooksList';
import PageHeader from './components/Header';
import MainPage from './domain/main/MainPage';

const queryClient = new QueryClient();

const App = function () {
  return (
    <QueryClientProvider client={queryClient}>
      <PageHeader />
      {/* <BooksList books={['b1', 'b2']} /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/books" element={<BooksList />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
