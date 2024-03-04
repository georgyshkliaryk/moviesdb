import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { moviesEndpoint } from './constants/endpoints';
import { routes } from './constants/routes';
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MoviePage from './pages/MoviePage/MoviePage';
import './App.scss';

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <HomePage />,
  },
  {
    path: routes.moviesList.nowPlaying,
    element: <MoviesPage title={'Now Playing'} endpointUrl={`${moviesEndpoint}/now_playing`} />,
  },
  {
    path: routes.moviesList.popular,
    element: <MoviesPage title={'Popular Movies'} endpointUrl={`${moviesEndpoint}/popular`} />,
  },
  {
    path: routes.moviesList.topRated,
    element: <MoviesPage title={'Top Rated'} endpointUrl={`${moviesEndpoint}/top_rated`} />,
  },
  {
    path: routes.moviesList.comingSoon,
    element: <MoviesPage title={'Coming Soon'} endpointUrl={`${moviesEndpoint}/upcoming`} />,
  },
  {
    path: '/movie/:id',
    element: <MoviePage />,
  },
]);

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
