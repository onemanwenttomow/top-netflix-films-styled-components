import styled from "styled-components/macro";
import FilmCard from "./FilmCard";

function FilmCardWrapper({ films }) {
    return (
        <div>
            {films.map((film) => (
                <FilmCard film={film} key={film.netflixid} />
            ))}
        </div>
    );
}

const Wrapper = styled.div`
    background-color: green;
`;

export default FilmCardWrapper;
