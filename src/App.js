import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourite, setFavourite] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=70f3f310`;
    const response = await fetch(url);
    const responseJSON = await response.json();

    // console.log(responseJSON);
    if (responseJSON.Search) {
      setMovies(responseJSON.Search);
    }
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(()=>
  {
    const movieFavourites= JSON.parse(localStorage.getItem('react-movie-app-favourites'));
    setFavourite(movieFavourites);
  },[]);

  const saveLocalStorage =(items)=>
  {
    localStorage.setItem('react-movie-app-favourites',JSON.stringify(items))
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList=[...favourite,movie];
    setFavourite(newFavouriteList)
    saveLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourite.filter(
      (fav)=> fav.imdbID!==movie.imdbID
    );
    setFavourite(newFavouriteList);
    saveLocalStorage(newFavouriteList);
		}

  return (
    <>
      <div className="container-fluid movie-app">
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading="Movies" />
          <SearchBox setSearchValue={setSearchValue} />
        </div>
        <div className="row">
          <MovieList
            movies={movies}
            handelFavouriteclick={addFavouriteMovie}
            favouriteComponent={AddFavourites}
          />
        </div>
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading="Favourites" />
          
        </div>
        <div className="row">
          <MovieList
            movies={favourite}
            handelFavouriteclick={removeFavouriteMovie}
            favouriteComponent={RemoveFavourites}
          />
        </div>
      </div>
    </>
  );
}

export default App;
