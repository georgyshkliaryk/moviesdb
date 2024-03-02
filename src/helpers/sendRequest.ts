const headers = {
  accept: 'application/json',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDE2YmVlMTgzY2E2OTY4YjQyZTc4MzZhZjEwYTU3MSIsInN1YiI6IjY1ZTMyOWQzMjc4ZDhhMDE4NWJlODg3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.THnWtuzV76gqFmM2894ixtLEFWvb5RPl9iKTIT6v8lU',
};

export const getData = async (url: string): Promise<any> => {
  const options = {
    method: 'GET',
    headers,
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (e: any) {
    throw new Error(e);
  }
};
