import styled from "styled-components/macro";
import FilmCard from "./FilmCard";

function FilmCardWrapper({ films, heading }) {
    return (
        <Wrapper>
            <h3>{heading}</h3>
            <FilmsContainer>
                {films.map((film) => (
                    <FilmCard film={film} key={film.netflixid} />
                ))}
            </FilmsContainer>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    margin-bottom: 24px;
`

const FilmsContainer = styled.div`
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
