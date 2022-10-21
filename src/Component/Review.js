import {Button} from "@mui/material";
import * as React from "react";
import {useState} from "react";

export default function Review(props) {
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewText, setReviewText] = useState("");


    const saveReview = () => {

        fetch("http://localhost:3001/reviews", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: "Anon",
                movieId: props.singleMovieExtra.movieId,
                reviewTitle: reviewTitle,
                reviewText: reviewText
            })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("bad input values")
                }
                return res.json()

            })
            .then(() => {
                setReviewTitle("");
                setReviewText("");

            })
            .catch((e) => {
                console.error(e)
            });
    }


    return (


        <div>

            <input
                placeholder={"Review Title"}
                value={reviewTitle}
                onChange={(e) => (setReviewTitle(e.target.value))}
            />

            <input className={"inputReview"}
                   placeholder={"Review Text"}
                   value={reviewText}
                   onChange={(e) => (setReviewText(e.target.value))}
            />
            <Button onClick={()=> {{saveReview()}}} className={"SubmitReview"} variant="contained">Submit</Button>
        </div>
    )

}


