import styled from "styled-components/macro";

function FilmCard({ film }) {
    return (
        <Wrapper>
            <FilmPoster src={film.image} alt={film.title} />
            <figcaption>
                {film.title} ({film.released})
            </figcaption>
        </Wrapper>
    );
}

const Wrapper = styled.figure`
    /* background-color: green; */
`;

const FilmPoster = styled.img`
    border-radius: 8px;
`

export default FilmCard;
