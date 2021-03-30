import { useEffect, useState } from "react";
import GlobalStyles from "./GlobalStyles";
import FilmCardWrapper from "./FilmCardWrapper";

import styled from "styled-components/macro";

function App() {
    const [topFilms, setTopFilms] = useState([]);

    useEffect(() => {
        // maybe switch this to a custom hook?
        // create todays date
        const date = new Date().toLocaleDateString("en-UK", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        });
        // check if films have already been added for todays date
        if (date === window.localStorage.getItem("updateDate")) {
            // if so get them from local strorage
            setTopFilms(JSON.parse(window.localStorage.getItem("films")));
            return;
        }
        (async () => {
            // if not get them from the api and add them to local storage
            const response = await fetch(`/.netlify/functions/netflix-films`);
            const data = await response.json();
            setTopFilms(data.ITEMS);
            window.localStorage.setItem("films", JSON.stringify(data.ITEMS));
            window.localStorage.setItem("updateDate", date);
        })();
    }, []);

    console.log("topFilms: ", topFilms);

    return (
        <Wrapper>
            <AppHeader>
                <h1>Top Films on Netflix Germany</h1>
                <FilmCardWrapper films={topFilms} />
            </AppHeader>
            <GlobalStyles />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    /* background-color: green; */
`;
const AppHeader = styled.header`
    /* background-color: #282c34; */
    min-height: 100vh;
    font-size: calc(10px + 2vmin);
    /* color: white; */
`;

export default App;
