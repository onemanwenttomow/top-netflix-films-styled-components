import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

function FilmCard(props) {
    const imdbid = props.match.params.id;
    const [filmData, setFilmData] = useState(null);
    const [errorStatus, setErrorStatus] = useState(null);
    useEffect(() => {
        (async () => {
            const response = await fetch(`/.netlify/functions/extra-film-data?id=${imdbid}`);
            const data = await response.json();
            console.log("data: ", data);
            if (data.error) {
                console.log("data.status: ", data.status);
                // return window.location.replace("/");
                setErrorStatus(data.status);
                return;
            }
            setFilmData(data);
        })();
    }, [imdbid]);

    console.log("errorStatus: ", errorStatus);

    if (errorStatus === 404) {
        return (
            <Wrapper>
                <Link to="/">
                    Sorry, we could not find any extra info about this film. Please return to the
                    homepage
                </Link>
            </Wrapper>
        );
    }

    if (!filmData) {
        return null;
    }

    return (
        <Wrapper>
            <Link to="/">X</Link>
            <div>
                <img src={filmData.Poster} alt={filmData.Title} />
                <h1>{filmData.Title}</h1>
                <div>
                    <p>{filmData.Rated}</p>
                    <p>{filmData.Released}</p>
                    <p>{filmData.Genre}</p>
                    <p>{filmData.Runtime}</p>
                </div>
            </div>
            <div>
                <Trailer
                    title="trailer"
                    id="ytplayer"
                    type="text/html"
                    src={`https://www.youtube.com/embed/${filmData.videos?.results[0]?.key}`}
                    frameBorder="0"
                ></Trailer>
                Youtube id - {filmData.videos?.results[0]?.id} {filmData.videos?.results[0]?.site}
            </div>
            <div>
                {filmData.Ratings.map((score) => (
                    <p key={score.Source}>
                        {" "}
                        {score.Source} - {score.Value}{" "}
                    </p>
                ))}
            </div>
            <div>{filmData.Plot}</div>
            <a href={`https://www.netflix.com/watch/${filmData.netflixid}`}>Watch on Netflix</a>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0; */
    /* background-color: cadetblue; */
`;

const Trailer = styled.iframe`
    width: 100%;
    aspect-ratio: 16 / 9;
`;

export default FilmCard;
