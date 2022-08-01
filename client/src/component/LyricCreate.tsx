import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

declare global {
  type LyricCreateType = {
    songId: string;
  };
}

const LyricCreate = (props: LyricCreateType) => {
  const [content, setContent] = useState("");
  const [mutation] = useMutation(ADD_LYRIC_TO_SONG);

  const onSubmit = (event: any) => {
    event.preventDefault();

    mutation({
      variables: {
        content,
        songId: props.songId,
      },
    }).then(() => setContent(""));
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Add a Lyric</label>
      <input
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
    </form>
  );
};

const ADD_LYRIC_TO_SONG = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
      }
    }
  }
`;

export default LyricCreate;
