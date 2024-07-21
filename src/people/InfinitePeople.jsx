import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
// we need to import infinite query
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // here we using use infinite and getting:
  // data as pages, fetchNextPage to move on next page and has next page as boolean to check
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    // we need query key
    queryKey: ["sw-people"],
    // in query function we get prop page param and we can set as default which will fetch
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    // with this get next param it will move from last page and if last page doesnt exist then undefined
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  });

  if (isLoading) return <div className="loading">loading...</div>;

  if (isError) return <div>{error.message}</div>;

  console.log(data);

  return (
    // we need here for infinite scroll some props to make it work
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll
        initialLoad={false}
        children={data.pages.map((pageData) => {
          return pageData.results.map((person) => (
            <Person
              key={person.name}
              name={person.name}
              hairColor={person.hair_color}
              eyeColor={person.eye_color}
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
