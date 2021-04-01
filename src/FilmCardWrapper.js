import styled from "styled-components/macro";
import FilmCard from "./FilmCard";

function FilmCardWrapper({ films, heading }) {
    // show first 10 films. when user scrolls to end, then add more films using
    // intersectionobserver api
    return (
        <>
            <h3>{heading}</h3>
            <FilmsContainer>
                {films.map((film) => (
                    <FilmCard film={film} key={film.netflixid} />
                ))}
            </FilmsContainer>
        </>
    );
}


const FilmsContainer = styled.div`
    overflow-x: auto;
    display: flex;
    ::-webkit-scrollbar {
        width: 0; /* Remove scrollbar space */
        background: transparent; /* Optional: just make scrollbar invisible */
    }
    /* Optional: show position indicator in red */
    /* ::-webkit-scrollbar-thumb {
        background: black;
    } */
`;

export default FilmCardWrapper;
