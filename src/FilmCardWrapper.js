import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import FilmCard from "./FilmCard";
import { useElementOnScreen } from "./hooks";
import { sortFilmsAscending, sortFilmsDescending, sortFilmsByRating } from "./helpers";

function FilmCardWrapper({ films, heading, defaultSort = "rating" }) {
    const [isActive, setIsActive] = useState(defaultSort);
    const [yearOrderIsAscending, setYearOrderIsAscending] = useState(true);
    const [filmsToShow, setFilmsToShow] = useState([]);
    const [scrollContainer, numberToShow] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    });

    useEffect(() => {
        setFilmsToShow(films);
    }, [films]);

    function setActive(sortBy) {
        setIsActive(sortBy);
        let reOrderedFilms =
            sortBy === "rating" ? sortFilmsByRating(filmsToShow) : sortFilmsAscending(filmsToShow);
        setFilmsToShow(reOrderedFilms);
    }

    function setYearDirection() {
        setYearOrderIsAscending(!yearOrderIsAscending);
        let reOrderedFilms = yearOrderIsAscending
            ? sortFilmsDescending(filmsToShow)
            : sortFilmsAscending(filmsToShow);
        setFilmsToShow(reOrderedFilms);
    }
    console.log("yearOrderIsAscending: ", yearOrderIsAscending);

    return (
        <>
            <h3>
                {heading} Sort By:
                <SortByTag active={isActive === "rating"} onClick={() => setActive("rating")}>
                    Rating
                </SortByTag>
                <SortByTag active={isActive === "year"} onClick={() => setActive("year")}>
                    Year
                </SortByTag>
                {isActive === "year" && (
                    <span onClick={setYearDirection}>{yearOrderIsAscending ? "⬆" : "⬇"} </span>
                )}
            </h3>
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

const SortByTag = styled.span`
    background-color: ${(p) => (p.active ? "red" : "transparent")};
    padding: 0 16px;
`;

export default FilmCardWrapper;
