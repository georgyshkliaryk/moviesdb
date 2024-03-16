import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../helpers/sendRequest';
import useFetchData from '../../hooks/useFetchData';
import Loading from '../../components/common/Loading/Loading';
import Button from '../../components/common/Button/Button';
import { routes } from '../../constants/routes';
import { imdbTitlePath, posterPath } from '../../constants/paths';
import { getMoviesEndpoint } from '../../constants/endpoints';
import { ReactComponent as ImdbLogo } from '../../assets/icons/imdb.svg';
import styles from './MoviePage.module.scss';

interface MovieInfo {
  title: string;
  original_title: string;
  tagline: string;
  runtime: number;
  release_date: string;
  revenue: number;
  vote_average: number;
  vote_count: number;
  production_countries: {
    name: string;
    iso_3166_1: string;
  }[];
  poster_path: string;
  overview: string;
  imdb_id: string;
  genres: {
    name: string;
    id: number;
  }[];
  backdrop_path: string;
  budget: number;
  adult: boolean;
  original_language: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
}

const getMovieInfo = (endpointUrl: string): Promise<MovieInfo> => {
  return getData(endpointUrl);
};

const MoviePage: FC = () => {
  const { id: movieId } = useParams();
  const { data: movieInfo, isLoading } = useFetchData(() => getMovieInfo(`${getMoviesEndpoint}/${movieId}`));

  const {
    backdrop_path,
    title,
    poster_path,
    original_title,
    overview,
    imdb_id,
    genres,
    budget,
    adult,
    runtime,
    tagline,
    production_countries,
    original_language,
    revenue,
    release_date,
    production_companies,
  } = movieInfo || {};

  const formattedReleaseDate = useMemo(() => {
    if (!release_date) {
      return null;
    }
    const date = new Date(release_date);

    return date.toLocaleDateString();
  }, [movieInfo?.release_date]);

  const productionCountries = useMemo(() => {
    if (!production_countries?.length) {
      return null;
    }

    return production_countries.map((country) => (
      <span key={country.iso_3166_1} className={styles.country}>
        {country.name}
      </span>
    ));
  }, [movieInfo?.production_countries]);

  const productionCompanies = useMemo(() => {
    if (!production_companies?.length) {
      return null;
    }

    return (
      <div className={styles.companies}>
        {production_companies.map((company) => (
          <>
            {company.logo_path && (
              <img
                src={`${posterPath}/w185/${company.logo_path}`}
                alt={company.name}
                className={styles.companyLogo}
                title={company.name}
              />
            )}
          </>
        ))}
      </div>
    );
  }, [movieInfo?.production_countries]);

  if (isLoading) {
    return <Loading customClassName={styles.loading} />;
  }

  if (!isLoading && !movieInfo) {
    return (
      <div className={styles.notFound}>
        The movie could not be loaded.
        <Button text={'Go back home'} url={routes.home} />
      </div>
    );
  }

  const backgroundPoserUrl = `${posterPath}/original/${backdrop_path}`;
  const posterUrl = `${posterPath}/w500/${poster_path}`;

  return (
    <div className={styles.container} style={{ backgroundImage: `url('${backgroundPoserUrl}')` }}>
      <div className={styles.card}>
        <div className={styles.cardHeading}>
          <img src={posterUrl} alt={title} className={styles.image} />
          <div className={styles.info}>
            {!!formattedReleaseDate && (
              <div className={styles.infoItem}>
                <span className={styles.infoTitle}>Released on</span>
                <span className={styles.infoValue}>{formattedReleaseDate}</span>
              </div>
            )}
            {!!tagline && (
              <div className={styles.infoItem}>
                <span className={styles.infoTitle}>Tagline</span>
                <span className={styles.infoValue}>{tagline}</span>
              </div>
            )}
            {!!budget && (
              <div className={styles.infoItem}>
                <span className={styles.infoTitle}>Budget</span>
                <span className={styles.infoValue}>{`$ ${(budget / 1_000_000).toFixed(2)}m`}</span>
              </div>
            )}
            {!!revenue && (
              <div className={styles.infoItem}>
                <span className={styles.infoTitle}>Revenue</span>
                <span className={styles.infoValue}>{`$ ${(revenue / 1_000_000).toFixed(2)}m`}</span>
              </div>
            )}
            <div className={styles.infoItem}>
              <span className={styles.infoTitle}>Duration</span>
              <span className={styles.infoValue}>{runtime} min</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoTitle}>Original language</span>
              <span className={styles.infoValue}>{original_language}</span>
            </div>
            {!!productionCountries && (
              <div className={styles.infoItem}>
                <span className={styles.infoTitle}>Countries</span>
                <span className={styles.infoValue}>{productionCountries}</span>
              </div>
            )}
          </div>
        </div>
        <h1 className={styles.title}>
          {title}
          {!!imdb_id && (
            <a href={`${imdbTitlePath}/${imdb_id}`} target="_blank">
              <ImdbLogo className={styles.imdbLogo} />
            </a>
          )}
        </h1>
        <h3 className={styles.subtitle}>{original_title}</h3>
        {genres?.map((genre) => (
          <span key={genre.id} className={styles.genre}>
            {genre.name}
          </span>
        ))}
        <div className={styles.overview}>{overview}</div>
        {productionCompanies}
        <Button text={'Go back home'} url={routes.home} customClassName={styles.goHomeButton} />
      </div>
    </div>
  );
};

export default MoviePage;
