import { useState } from "react";
import styled from "styled-components/macro";
import { sortFilmsAscending, sortFilmsDescending, sortFilmsByRating } from "./helpers";

function SortingTags({ defaultSort, setFilmsToShow, filmsToShow }) {
    const [isActive, setIsActive] = useState(defaultSort);
    const [yearOrderIsAscending, setYearOrderIsAscending] = useState(true);

    function setActive(sortBy) {
        setIsActive(sortBy);
        let reOrderedFilms =
            sortBy === "rating" ? sortFilmsByRating(filmsToShow) : sortFilmsAscending(filmsToShow);
        setFilmsToShow(reOrderedFilms);
        setYearOrderIsAscending(true);
    }

    function setYearDirection() {
        setYearOrderIsAscending(!yearOrderIsAscending);
        let reOrderedFilms = yearOrderIsAscending
            ? sortFilmsDescending(filmsToShow)
            : sortFilmsAscending(filmsToShow);
        setFilmsToShow(reOrderedFilms);
    }

    return (
        <>
            <SortByTag active={isActive === "rating"} onClick={() => setActive("rating")}>
                Rating
            </SortByTag>
            <SortByTag active={isActive === "year"} onClick={() => setActive("year")}>
                Year
            </SortByTag>
            {isActive === "year" && (
                <YearDirection
                    onClick={setYearDirection}
                    active={isActive === "year"}
                    yearOrderIsAscending={yearOrderIsAscending}
                >
                    ⬆
                </YearDirection>
            )}
        </>
    );
}

const SortByTag = styled.span`
    background-color: ${(p) => (p.active ? "hsl(0, 0%, 80%)" : "transparent")};
    margin-left: 16px;
    padding: 8px 6px;
    cursor: pointer;
`;

const YearDirection = styled.span`
    display: inline-block;
    /* background-color: ${(p) => (p.active ? "hsl(0, 0%, 80%)" : "transparent")}; */
    padding: 8px 6px;
    transition: all 0.3s ease-in-out;
    transform: ${(p) => (p.yearOrderIsAscending ? "rotate(0)" : "rotate(180deg)")};
    cursor: pointer;
`;

export default SortingTags;
