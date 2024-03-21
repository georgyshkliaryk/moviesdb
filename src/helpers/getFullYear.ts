export const getReleaseYear = (releaseDate: string) => {
  if (!releaseDate) {
    return null;
  }
  const date = new Date(releaseDate);
  return date.getFullYear();
};
