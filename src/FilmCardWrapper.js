import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import FilmCard from "./FilmCard";
import SortingTags from "./SortingTags";
import { useElementOnScreen } from "./hooks";

function FilmCardWrapper({ films, heading, defaultSort = "rating" }) {
    const [filmsToShow, setFilmsToShow] = useState([]);
    const [scrollContainer, numberToShow] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    });

    useEffect(() => {
        setFilmsToShow(films);
    }, [films]);

    function setSortedFilms(sortedFilms) {
        setFilmsToShow([...sortedFilms]);
    }

    return (
        <>
            <Heading>{heading}</Heading>
            <SortingTags
                defaultSort={defaultSort}
                setFilmsToShow={setSortedFilms}
                filmsToShow={filmsToShow}
            />
            <FilmsContainer ref={scrollContainer}>
                {filmsToShow.slice(0, numberToShow).map((film) => (
                    <FilmCard film={film} key={film.netflixid} />
                ))}
            </FilmsContainer>
        </>
    );
}

const FilmsContainer = styled.div`
    overflow-x: auto;
    display: flex;
    min-height: 345px;
    ::-webkit-scrollbar {
        width: 0; /* Remove scrollbar space */
        background: transparent; /* Optional: just make scrollbar invisible */
    }
    /* Optional: show position indicator in red */
    /* ::-webkit-scrollbar-thumb {
        background: black;
    } */
`;

const Heading = styled.div`
    margin: 16px 0;
`

export default FilmCardWrapper;
