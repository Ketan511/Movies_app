import React from "react";

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="col col-sm-3 image-container d-flex justify-content-start m-3">
          <img src={movie.Poster} alt="movie"></img>
          <div onClick={()=>props.handelFavouriteclick(movie)}
          className="overlay d-flex align-items-center justify-content-center">
            <FavouriteComponent />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
