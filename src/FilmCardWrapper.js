import { useRef, useEffect, useState } from "react";
import styled from "styled-components/macro";
import FilmCard from "./FilmCard";

function FilmCardWrapper({ films, heading }) {
    const [numberToShow, setNumberToShow] = useState(10);
    const scrollContainer = useRef();
    useEffect(() => {
        let options = {
            root: scrollContainer.current,
            rootMargin: "0px",
            threshold: 0.9
        };
        const filmToWatch = scrollContainer.current.children[numberToShow - 1];

        if (!filmToWatch) {
            return;
        }

        let callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log("remove observer from this element", filmToWatch);
                    observer.unobserve(filmToWatch);
                    setNumberToShow((num) => (num += 10));
                }
            });
        };
        let observer = new IntersectionObserver(callback, options);
        observer.observe(filmToWatch);

        return () => console.log("cleaning up");
    }, [numberToShow]);
    films = films.slice(0, numberToShow);
    return (
        <>
            <h3>{heading}</h3>
            <FilmsContainer ref={scrollContainer}>
                {films.map((film) => (
                    <FilmCard film={film} key={film.netflixid} />
                ))}
            </FilmsContainer>
        </>
    );
}

const FilmsContainer = styled.div`
    overflow-x: auto;
    display: flex;
    ::-webkit-scrollbar {
        width: 0; /* Remove scrollbar space */
        background: transparent; /* Optional: just make scrollbar invisible */
    }
    /* Optional: show position indicator in red */
    /* ::-webkit-scrollbar-thumb {
        background: black;
    } */
`;

export default FilmCardWrapper;
