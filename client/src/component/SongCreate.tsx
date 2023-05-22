import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

const SongCreate = () => {
  const navigate = useNavigate();
  const [mutation, { data, loading, error }] = useMutation(ADD_SONG);
  const [title, setTitle] = useState("");

  const onSubmit = (event: any) => {
    event.preventDefault();

    mutation({
      variables: {
        title,
      },
      refetchQueries: [{ query: GET_SONG }],
      onCompleted: () => navigate("/"),
    }); // .then(() => navigate("/"));
  };
  const handleChange = (event: any) => {
    setTitle(event?.target.value);
  };

  return (
    <div>
      <Link to={"/"}>Back</Link>
      <h3>Create a new Song</h3>
      <form action="" aria-label="form-submit" onSubmit={onSubmit}>
        <label htmlFor="">Song Title:</label>
        <input
          type="text"
          aria-label="song-title"
          value={title}
          //   onChange={(event) => setTitle(event.target.value)}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export const ADD_SONG = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export const GET_SONG = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default SongCreate;
