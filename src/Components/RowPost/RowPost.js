import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./RowPost.css";
import { API_KEY, imageUrl } from "../../Constants/constants";
import axios from "../../axios";
function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState("");
  useEffect(() => {
    axios.get(props.url).then((response) => {
      setMovies(response.data.results);
    });
  }, []);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie = (id) => {
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]);
        } else {
          // Handle the case when there are no video results
          console.log("No videos available for this movie.");
          // You might want to display a message to the user or take other actions.
        }
      })
      .catch((error) => {
        // Handle the error if the request fails
        console.error("Error fetching movie videos:", error);
      });
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            onClick={() => handleMovie(obj.id)}
            key={obj.id}
            className={props.isSmall ? "smallPoster" : "poster"}
            alt="posters"
            src={`${imageUrl + obj.backdrop_path}`}
          />
        ))}
      </div>
      {urlId && <YouTube opts={opts} videoId={urlId.key} />}
    </div>
  );
}

export default RowPost;
