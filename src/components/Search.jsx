import React, { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Link from "./Link";

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

function Search() {
  const [searchField, setSearchField] = useState("");
  const [executeSearch, { data }] = useLazyQuery(FEED_SEARCH_QUERY);

  useEffect(() => {
    console.log(searchField);
  }, [searchField]);

  return (
    <>
      <div className="search background-gray">
        Search
        <input
          type="text"
          value={searchField}
          onChange={(event) => {
            event.preventDefault();
            setSearchField(event.target.value);
          }}
        />
        <button
          onClick={() => {
            executeSearch({ variables: { filter: searchField } });
          }}
        >
          OK
        </button>
      </div>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </>
  );
}

export default Search;
