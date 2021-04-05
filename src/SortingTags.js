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

    function setYearDirection(e) {
        e.stopPropagation();
        if (isActive !== "year") {
            return;
        }
        setYearOrderIsAscending(!yearOrderIsAscending);
        let reOrderedFilms = yearOrderIsAscending
            ? sortFilmsDescending(filmsToShow)
            : sortFilmsAscending(filmsToShow);
        setFilmsToShow(reOrderedFilms);
    }

    return (
        <Wrapper>
            <SortByTag active={isActive === "rating"} onClick={() => setActive("rating")}>
                Rating
            </SortByTag>
            <SortByTag active={isActive === "year"} onClick={() => setActive("year")}>
                Year
                <YearDirection
                    onClick={setYearDirection}
                    active={isActive === "year"}
                    yearOrderIsAscending={yearOrderIsAscending}
                >
                    ⬆
                </YearDirection>
            </SortByTag>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    font-size: 0.8em;
    margin: 8px 0;
`;

const SortByTag = styled.span`
    /* background-color: ${(p) => (p.active ? "hsl(0, 0%, 80%)" : "transparent")}; */
    margin-left: 16px;
    /* border-bottom-left-radius: 4px; */
    /* border-bottom-right-radius: 4px; */
    border-bottom: ${(p) => (p.active ? "solid 2px blue" : "transparent")};
    padding: 4px 16px;
    cursor: pointer;
    &:first-child {
        margin-left: 0;
    }
    &:last-child {
        padding-right: 8px;
    }
`;

const YearDirection = styled.span`
    display: inline-block;
    /* background-color: ${(p) => (p.active ? "hsl(0, 0%, 80%)" : "transparent")}; */
    padding: 0px 8px;
    transition: all 0.3s ease-in-out;
    transform: ${(p) => (p.yearOrderIsAscending ? "rotate(0)" : "rotate(180deg)")};
    cursor: pointer;
`;

export default SortingTags;
