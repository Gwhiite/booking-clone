import { notFound } from "next/navigation";
import React from "react";

type Props = {
  searchParams: SearchParams
}

type SearchParams ={
  url: URL;
  checkin: string;
  checkout: string;
  group_adults: string;
  group_children: string;
  no_rooms: string;
}

const SearchPage = async ({searchParams}: Props) => {
  if(!searchParams.url) return notFound();

  const results = await fetchResults(searchParams)

  if (!results) return notFound()

  return <div>
    SearchPage
  </div>;
};

export default SearchPage;
