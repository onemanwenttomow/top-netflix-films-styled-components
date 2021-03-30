import styled from "styled-components/macro";
import FilmCard from "./FilmCard";

function FilmCardWrapper({ films }) {
    return (
        <Wrapper>
            {films.map((film) => (
                <FilmCard film={film} key={film.netflixid} />
            ))}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    /* background-color: green; */
    overflow-x: auto;
    display: flex;
    ::-webkit-scrollbar {
        width: 0; /* Remove scrollbar space */
        background: transparent; /* Optional: just make scrollbar invisible */
    }
    /* Optional: show position indicator in red */
    ::-webkit-scrollbar-thumb {
        background: black;
    }
`;

export default FilmCardWrapper;
