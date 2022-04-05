import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FEED_QUERY } from "./LinkList";
import { AUTH_TOKEN, LINKS_PER_PAGE } from "../constants";

function CreateLink() {
  const CREATE_LINK_MUTATION = gql`
    mutation PostMutation($description: String!, $url: String!) {
      post(description: $description, url: $url) {
        id
        createdAt
        description
        url
      }
    }
  `;

  const [formState, setFormState] = useState({
    url: "",
    description: "",
  });

  const navigate = useNavigate();

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
    update: (cache, { data: post }) => {
      const take = LINKS_PER_PAGE;
      const skip = 0;
      const orderBy = { createdAt: "desc" };

      const data = cache.readQuery({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy,
        },
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: [post, ...data.feed.links],
          },
          variables: {
            take,
            skip,
            orderBy,
          },
        },
      });
    },
    onCompleted: () => navigate("/"),
  });

  return (
    <div className="createlink background-gray">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createLink();
        }}
      >
        <input
          type="text"
          placeholder="A description for your link"
          value={formState.description}
          onChange={(event) => {
            event.preventDefault();
            setFormState((prevState) => ({
              ...prevState,
              description: event.target.value,
            }));
          }}
        />

        <input
          type="text"
          value={formState.url}
          placeholder="Your link"
          onChange={(event) => {
            event.preventDefault();
            setFormState((prevState) => ({
              ...prevState,
              url: event.target.value,
            }));
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateLink;
