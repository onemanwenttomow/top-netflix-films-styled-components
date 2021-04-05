import { useState } from "react";
import styled from "styled-components/macro";
import { parseText } from "./helpers";
import FilmModal from "./FilmModal";

function FilmCard({ film }) {
    const title = parseText(film.title);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(null);
    // need to handle when img srcs are broken.

    function handleClick(netflixid) {
        console.log("clicked!");
        setId(netflixid);
        setShowModal(true);
    }

    return (
        <Wrapper>
            <Figure onClick={() => handleClick(film.imdbid)}>
                <FilmPoster src={film.image} alt={film.title} />
                <ExtraInfoWrapper>
                    <ExtraInfo>({film.released})</ExtraInfo>
                    <ExtraInfo>
                        IMDB:<Bold>{film.rating}</Bold>
                    </ExtraInfo>
                </ExtraInfoWrapper>
                <FigCaption>{title}</FigCaption>
            </Figure>
            {showModal && <FilmModal closeModal={() => setShowModal(false)} id={id} />}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    /* background-color: green; */
    padding: 0 8px;
    :first-of-type {
        padding-left: 0;
    }
    :last-of-type {
        padding-right: 0;
    }
`;

const Figure = styled.figure`
    max-width: 166px;
`;

const ExtraInfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 4px;
`;

const Bold = styled.span`
    color: hsl(0, 0%, 20%);
`;

const ExtraInfo = styled.p`
    font-size: 0.8rem;
    color: hsl(0, 0%, 40%);
`;

const FigCaption = styled.figcaption`
    font-size: 0.9rem;
    color: hsl(0, 0%, 20%);
`;

const FilmPoster = styled.img`
    border-radius: 8px;
`;

export default FilmCard;
