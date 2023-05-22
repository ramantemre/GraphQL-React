import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import LyricList from "./LyricList";
import LyricCreate from "./LyricCreate";

const SongDetail = () => {
  const params = useParams();
  const { loading, error, data } = useQuery(GET_SONGS_LIST, {
    variables: { id: params.id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) return <div>Error:</div>;

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>{data?.song?.title}</h3>
      <LyricList lyrics={data?.song?.lyrics} />
      <LyricCreate songId={params.id || ""} />
    </div>
  );
};

export const GET_SONGS_LIST = gql`
  query SongQuery($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default SongDetail;
