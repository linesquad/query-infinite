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
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    // we need query key
    queryKey: ["sw-people"],
    // in query function we get prop page param and we can set as default which will fetch
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    // with this get next param it will move from last page and if last page doesnt exist then undefined
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  });
  return <InfiniteScroll />;
}
