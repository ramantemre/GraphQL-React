import React from "react";
import { useMutation, gql } from "@apollo/client";

declare global {
  type Lyric = Array<{ id: string; content: string; likes: number }>;
  type LyricListType = {
    lyrics: Lyric;
  };
}

const LyricList = (props: LyricListType) => {
  const [mutation] = useMutation(LIKE_LYRIC);

  const onLike = (id: string, like: number) => {
    mutation({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id: id,
          __typename: "LyricType",
          likes: like + 1,
        },
      },
    });
  };

  const renderLyrics = () => {
    return props?.lyrics.map(({ id, content, likes }: any) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            <i className="material-icons" onClick={() => onLike(id, likes)}>
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  };

  return <ul className="collection">{renderLyrics()}</ul>;
};

const LIKE_LYRIC = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default LyricList;
