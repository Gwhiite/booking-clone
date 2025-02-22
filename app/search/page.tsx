import fetchResults from "@/lib/fetchResults";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  searchParams: SearchParams;
};

export type SearchParams = {
  url: URL;
  checkin: string;
  checkout: string;
  group_adults: string;
  group_children: string;
  no_rooms: string;
};

const SearchPage = async ({ searchParams }: Props) => {
  if (!searchParams.url) return notFound();

  const results = await fetchResults(searchParams);

  if (!results) return notFound();
  console.log(results);

  return (
    <section>
      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        <h1 className="text-4xl font-bold pb-3">Your Trip Results</h1>
        <h2 className="pb-3">
          Dates of trip:
          <span className="italic ml-2">
            {searchParams.checkin} - {searchParams.checkout}
          </span>
        </h2>

        <hr className="mb-5" />

        <h3 className="font-semibold text-xl">
          {results.content.total_listings}
        </h3>

        <div className="sm:space-y-2 gap-2 grid grid-cols-1 min-[570px]:grid-cols-2 sm:flex sm:flex-col mt-5">
          {results.content.listings.map((item, i) => (
            <div
              className="flex min-w-64 sm:w-full flex-col sm:flex-row space-y-2 items-center sm:items-start justify-between sm:space-x-4 p-5 border rounded-lg"
              key={i}
            >
              <img
                src={item.url}
                alt="image of property"
                className="h-44 w-44 rounded-lg"
              />

              <div className="flex flex-col sm:flex-row flex-1 space-y-5 sm:space-y-0 sm:space-x-5 sm:items-start items-center sm:justify-between">
                <div className="flex flex-col items-center sm:items-start">
                  <Link
                    href={item.link}
                    target="_blank"
                    className="font-bold text-center sm:text-left text-blue-500 hover:text-blue-600 hover:underline"
                  >
                    {item.title}
                  </Link>
                  <p className="text-xs text-center sm:text-left">
                    {item.description}
                  </p>
                </div>

                <div className="sm:space-y-20">
                  <div className="flex sm:items-start sm:justify-end space-x-2 sm:text-right">
                    <div>
                      <p className="font-bold">{item.rating_word}</p>
                      <p className="text-xs">{item.rating_count}</p>
                    </div>
                    <p className="flex items-center justify-center font-bold text-sm w-10 h-10 text-white bg-blue-900 rounded-lg flex-shrink-0">
                      {item.rating || "N/A"}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-xs">{item.booking_metadata}</p>
                    <p className="text-2xl font-bold text-center sm:text-right">
                      {item.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
