import React from "react";

interface QuoteData {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string | Date;
  dateModified: string | Date;
}

export const useFetch = (url: string) => {
  const [data, setData] = React.useState<QuoteData | undefined>();
  const [isFetching, setIsFetching] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [fetchError, setFetchError] = React.useState<Error | undefined>();

  const getData = React.useCallback(() => {
    setIsFetching(true);

    fetch(url)
      .then((data) => {
        setIsLoading(true);
        data
          .json()
          .then((parsedData) => {
            setData(parsedData);
          })
          .catch((error) => setFetchError(error))
          .finally(() => setIsLoading(false));
      })
      .catch((error) => setFetchError(error))
      .finally(() => setIsFetching(false));
  }, [url, data, isFetching, isLoading, fetchError]);

  React.useEffect(() => {
    getData();
  }, []);

  return {
    data: React.useMemo(() => data, [data]),
    isFetching: React.useMemo(() => isFetching, [isFetching]),
    isLoading: React.useMemo(() => isLoading, [isLoading]),
    fetchError: React.useMemo(() => fetchError, [fetchError]),
    getData,
  };
};
