import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { moviesListEndpoint } from './constants/endpoints';
import { routes } from './constants/routes';
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import './App.scss';

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <HomePage />,
  },
  {
    path: routes.moviesList.nowPlaying,
    element: <MoviesPage title={'Now Playing'} endpointUrl={`${moviesListEndpoint}/now_playing`} />,
  },
  {
    path: routes.moviesList.popular,
    element: <MoviesPage title={'Popular Movies'} endpointUrl={`${moviesListEndpoint}/popular`} />,
  },
  {
    path: routes.moviesList.topRated,
    element: <MoviesPage title={'Top Rated'} endpointUrl={`${moviesListEndpoint}/top_rated`} />,
  },
]);

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
