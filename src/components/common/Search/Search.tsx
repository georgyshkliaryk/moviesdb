import { FC, ChangeEvent, useState, useRef, useEffect, SyntheticEvent } from 'react';
import { searchMovieEndpoint } from '../../../constants/endpoints';
import { getData } from '../../../helpers/sendRequest';
import { Movie, MoviesListResponse } from '../../../pages/MoviesPage/types';
import SearchResults from './SearchResults/SearchResults';
import styles from './Search.module.scss';

const getMoviesList = (endpointUrl: string): Promise<MoviesListResponse> => {
  return getData(endpointUrl);
};

const Search: FC = () => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListShown, setIsListShown] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef?.current && containerRef.current.contains(target)) {
        setIsListShown(true);
      } else {
        setIsListShown(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const value = e.target.value;
    setInputValue(value);
    const results = (await getMoviesList(`${searchMovieEndpoint}?query=${value}`)).results;
    setSearchResults(results);
    setIsLoading(false);
  };

  const isNoResults = !isLoading && isListShown && !!inputValue.length && !searchResults.length;

  return (
    <div className={styles.container} ref={containerRef}>
      <input type="text" placeholder="Search for a movie" className={styles.input} onChange={handleChange} />
      {!!inputValue.length && isListShown && (
        <SearchResults
          searchResults={searchResults}
          isLoading={isLoading}
          isNoResults={isNoResults}
          searchValue={inputValue}
        />
      )}
    </div>
  );
};

export default Search;
