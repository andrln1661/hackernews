import React, { useEffect } from "react";
import Link from "./Link";
import { gql, useQuery } from "@apollo/client";

const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

function LinkList() {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div className="linklist background-gray">
      {data?.feed.links.map((link) => {
        return <Link link={link} key={link.id} />;
      })}
    </div>
  );
}

export default LinkList;
