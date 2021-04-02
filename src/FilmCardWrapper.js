import { useRef, useEffect, useState } from "react";
import styled from "styled-components/macro";
import FilmCard from "./FilmCard";

function FilmCardWrapper({ films, heading }) {
    // show first 10 films. when user scrolls to end, then add more films using
    // intersectionobserver api
    const [numberToShow, setNumberToShow] = useState(10);
    const scrollContainer = useRef();
    useEffect(() => {
        // console.log("use effect in film card wrapper", scrollContainer);
        // console.log("scrollContainer.current.offsetWidth", scrollContainer.current.offsetWidth);
        // console.log("scrollContainer.current.scrollWidth", scrollContainer.current.scrollWidth);
        // console.log("scrollContainer.current.scrollLeft", scrollContainer.current.scrollLeft);
        // console.log(
        //     "last child",
        //     scrollContainer.current.children[numberToShow -1]
        // );
        let options = {
            root: scrollContainer.current,
            rootMargin: "0px",
            threshold: 1.0
        };
        const filmToWatch = scrollContainer.current.children[numberToShow - 1];

        if (!filmToWatch) {
            return;
        }

        let callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log("entry", entry);
                    console.log("bring in more films.");
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
    console.log('numberToShow: ',numberToShow);
    films = films.slice(0, numberToShow);
    return (
        <>
            <h3>{heading}</h3>
            <FilmsContainer ref={scrollContainer}>
                {films.map((film, idx) => (
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
