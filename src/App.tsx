import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getMoviesEndpoint } from './constants/endpoints';
import { routes } from './constants/routes';
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MoviePage from './pages/MoviePage/MoviePage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import './App.scss';

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <HomePage />,
  },
  {
    path: routes.moviesList.nowPlaying,
    element: <MoviesPage title={'Now Playing'} endpointUrl={`${getMoviesEndpoint}/now_playing`} />,
  },
  {
    path: routes.moviesList.popular,
    element: <MoviesPage title={'Popular Movies'} endpointUrl={`${getMoviesEndpoint}/popular`} />,
  },
  {
    path: routes.moviesList.topRated,
    element: <MoviesPage title={'Top Rated'} endpointUrl={`${getMoviesEndpoint}/top_rated`} />,
  },
  {
    path: routes.moviesList.comingSoon,
    element: <MoviesPage title={'Coming Soon'} endpointUrl={`${getMoviesEndpoint}/upcoming`} />,
  },
  {
    path: `${routes.movie}/:id`,
    element: <MoviePage />,
  },
  {
    path: `${routes.searchResults}/:value`,
    element: <SearchResultsPage />,
  },
]);

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
