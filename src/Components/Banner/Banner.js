import React, { useEffect, useState } from "react";
import { API_KEY, imageUrl } from "../../Constants/constants";
import axios from "../../axios";
import "./Banner.css";

function Banner() {
  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        setMovies(response.data.results);
        const randomIndex = Math.floor(Math.random() * response.data.results.length);
        setRandomMovie(response.data.results[randomIndex]);
        console.log(response.data.results[randomIndex]);
      })
      .catch((error) => {
        console.error("Error fetching trending movies:", error);
      });
  }, []); 

  return (
    <div
      style={{
        backgroundImage: `url(${randomMovie ? imageUrl + randomMovie.backdrop_path : ""})`,
      }}
      className="banner"
    >
      <div className="content">
        <h1 className="title">{randomMovie ? randomMovie.title : ""}</h1>
        <div className="banner_buttons">
          <button className="button">Play</button>
          <button className="button">My list</button>
        </div>
        <h1 className="description">{randomMovie ? randomMovie.overview : ""}</h1>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
