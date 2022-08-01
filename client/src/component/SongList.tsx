import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";

const SongList = () => {
  const { loading, error, data, refetch } = useQuery(GET_SONGS_LIST);
  const [mutation] = useMutation(DELETE_MUTUATION);

  const onSongDelete = (id: string) => {
    mutation({ variables: { id } }).then(() => refetch());
  };

  const renderSongs = () => {
    return data.songs.map((song: any) => (
      <li key={song.id} className="collection-item">
        <Link to={`/songs/${song.id}`}>{song.title}</Link>
        <i className="material-icons" onClick={() => onSongDelete(song.id)}>
          delete
        </i>
      </li>
    ));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return (
    <div>
      <h3>Songs List</h3>
      <ul className="collection">{renderSongs()}</ul>
      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

const GET_SONGS_LIST = gql`
  {
    songs {
      id
      title
    }
  }
`;

const DELETE_MUTUATION = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default SongList;
