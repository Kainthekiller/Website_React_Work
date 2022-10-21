import * as React from "react";
import {useEffect, useState} from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";
import {Button} from "@mui/material";
import Review from "./Review";



export default function MovieDetails(props) {
    const [selectedMovie, setSelectedMovie] = useState({})
//Use State


    //Use Effect

    useEffect(() => {
        fetchSingleMovie()
    }, [])



// Custom Method
    function fetchSingleMovie() {
        fetch(`http://localhost:3001/movies/${props.singleMovie.movieId}`)
            .then(res => res.json())
            .then(data => {
                setSelectedMovie(data)
            })
        console.log(selectedMovie.poster)
    }



    return (
        <>

            <h1>{selectedMovie.title}</h1>
            <p>Released {selectedMovie.released}</p>
            <p>{selectedMovie.genre} | {selectedMovie.actors}</p>
            <p>{selectedMovie.plot}</p>
            <ImageList sx={{ width: 1000, height: 850 }} cols={3} rowHeight={164}>

                    <ImageListItem key={selectedMovie.movieId}>
                        <img
                            src={`${selectedMovie.poster}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${selectedMovie.poster}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={selectedMovie.movieId}
                            loading="lazy"
                        />
        <Review singleMovieExtra={props.singleMovie} ></Review>
                    </ImageListItem>

            </ImageList>

        </>
    )



}
