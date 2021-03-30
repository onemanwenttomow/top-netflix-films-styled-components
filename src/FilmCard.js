import styled from "styled-components/macro";

function FilmCard({ film }) {
    return (
        <Wrapper>
            <Link href={`https://www.netflix.com/watch/${film.netflixid}`}>
                <Figure>
                    <FilmPoster src={film.image} alt={film.title} />
                    <FigCaption>
                        {film.title} ({film.released}) ({film.rating})
                    </FigCaption>
                </Figure>
            </Link>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    /* background-color: green; */
    padding: 8px 24px;
`;

const Link = styled.a`
    color: inherit;
    text-decoration: none;
`

const Figure = styled.figure`
    max-width: 166px;
`;

const FigCaption = styled.figcaption`
    font-size: 1rem;
`

const FilmPoster = styled.img`
    border-radius: 8px;
`

export default FilmCard;
