import { useState } from "react";
import styled from "styled-components/macro";
import { sortFilmsAscending, sortFilmsDescending, sortFilmsByRating } from "./helpers";

function SortingTags({ defaultSort, setFilmsToShow, filmsToShow }) {
    const [isActive, setIsActive] = useState(defaultSort);
    const [yearOrderIsAscending, setYearOrderIsAscending] = useState(true);

    function setActive(sortBy) {
        setIsActive(sortBy);
        let reOrderedFilms;
        if (sortBy === "rating") {
            reOrderedFilms = sortFilmsByRating(filmsToShow);
        } else {
            setYearOrderIsAscending(!yearOrderIsAscending);
            reOrderedFilms = yearOrderIsAscending
                ? sortFilmsDescending(filmsToShow)
                : sortFilmsAscending(filmsToShow);
        }
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
    margin: 16px 0;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
`;

const SortByTag = styled.span`
    position: relative;
    margin-left: 16px;
    border-bottom: ${(p) => (p.active ? "solid 2px blue" : "solid 2px transparent")};
    padding: 0px 16px;
    cursor: pointer;
    transition: all 0.3s ease-in;

    &:first-child {
        margin-left: 0;
    }
    &:last-child {
        padding-right: 24px;
    }
`;

const YearDirection = styled.span`
    position: absolute;
    display: inline-block;
    padding: 0px 8px;
    transition: all 0.3s ease-in-out;
    transform: ${(p) => (p.yearOrderIsAscending ? "rotate(0)" : "rotate(180deg)")};
    cursor: pointer;
`;

export default SortingTags;
