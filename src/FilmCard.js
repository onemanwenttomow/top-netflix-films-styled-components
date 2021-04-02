import styled from "styled-components/macro";
import { parseText } from "./helpers";

function FilmCard({ film }) {
    const title = parseText(film.title);
    // need to handle when img srcs are broken.
    
    return (
        <Wrapper>
            <Link href={`https://www.netflix.com/watch/${film.netflixid}`}>
                <Figure>
                    <FilmPoster src={film.image} alt={film.title} />
                    <FigCaption>
                        ({film.released}) IMDB:{film.rating}
                    </FigCaption>
                    <FigCaption>
                        {title}
                    </FigCaption>
                </Figure>
            </Link>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    /* background-color: green; */
    padding: 8px;
    :first-of-type {
        padding-left: 0;
    }
    :last-of-type {
        padding-right: 0;
    }
`;

const Link = styled.a`
    color: inherit;
    text-decoration: none;
`

const Figure = styled.figure`
    max-width: 166px;
`;

const FigCaption = styled.figcaption`
    font-size: 0.9rem;
    color: hsl(0, 0%, 40%);
`;

const FilmPoster = styled.img`
    border-radius: 8px;
`

export default FilmCard;
