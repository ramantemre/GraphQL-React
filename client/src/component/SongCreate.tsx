import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

const SongCreate = () => {
  const navigate = useNavigate();
  const [mutation, { data, loading, error }] = useMutation(ADD_SONG);
  const [title, setTitle] = useState("");
  console.log("useMutation", data, loading, error);
  const GET_SONG = gql`
    {
      songs {
        id
        title
      }
    }
  `;

  const onSubmit = (event: any) => {
    event.preventDefault();

    mutation({
      variables: {
        title,
      },
      refetchQueries: [{ query: GET_SONG }],
    }).then(() => navigate("/"));
  };

  return (
    <div>
      <Link to={"/"}>Back</Link>
      <h3>Create a new Song</h3>
      <form action="" onSubmit={(event) => onSubmit(event)}>
        <label htmlFor="">Song Title:</label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
    </div>
  );
};

const ADD_SONG = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default SongCreate;
