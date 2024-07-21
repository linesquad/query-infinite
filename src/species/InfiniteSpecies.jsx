import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
    error,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["sw-species"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });

  if (isLoading) return <div className="loading">Loading</div>;

  if (isError) return <div>{error.message}</div>;

  return (
    <>
      {isFetching && <div className="loading">Loading</div>}
      <InfiniteScroll
        initialLoad={false}
        children={data.pages.map((pageData) => {
          return pageData.results.map((specie) => (
            <Species
              key={specie.name}
              name={specie.name}
              language={specie.language}
              averageLifespan={specie.average_lifespan}
            />
          ));
        })}
        loadMore={() => {
          if (!isFetching) fetchNextPage();
        }}
        hasMore={hasNextPage}
      />
    </>
  );
}
