import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {useEffect, useState} from "react";
import MovieDetails from "./MovieDetails";

export default function MovieList(props) {

    //Use State Goes here


    //Hold a Whole Single Movie

    //retrieve all movies from server
    function fetchMovieList() {
        fetch("http://localhost:3001/movies/")
            .then(res => res.json())
            .then(data => {
               props.setMovieList(data)
            })

         // console.log(movieList)
    }

    //Use Effect
    useEffect(() => {
        fetchMovieList()

    }, [])

    // // Similar to componentDidMount and componentDidUpdate:
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     document.title = `You clicked ${count} times`;
    // });

    return (
        <ImageList >
            {props.movieList.map((item) => (
                <ImageListItem key={item.movieId}>
                    <img onClick={() =>
                    {
                        props.setSingleMovie(item)
                        props.multipleViewStatus(false)

                    }}
                        src={`${item.poster}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.poster}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"

                    />

                </ImageListItem>
            ))}
        </ImageList>
    );
}

