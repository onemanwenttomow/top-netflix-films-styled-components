import { useEffect, useState } from "react";
import GlobalStyles from "./GlobalStyles";
import FilmCardWrapper from "./FilmCardWrapper";

import styled from "styled-components/macro";

function App() {
    const [topFilms, setTopFilms] = useState([]);
    const [addedLast7Days, setaddedLast7Days] = useState([]);
    const [addedLast30Days, setaddedLast30Days] = useState([]);
    const [filmsRange2010_2020, setfilmsRange2010_2020] = useState([]);
    const [filmsRange2000_2010, setfilmsRange2000_2010] = useState([]);
    const [filmsRange1990_2000, setfilmsRange1990_2000] = useState([]);

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
            // setTopFilms(JSON.parse(window.localStorage.getItem("films")));
            console.log('from local');
            setFilms(JSON.parse(window.localStorage.getItem("films")));
            setaddedLast7Days(JSON.parse(window.localStorage.getItem("addedLast7Days")));
            setaddedLast30Days(JSON.parse(window.localStorage.getItem("addedLast30Days")));
            return;
        }
        (async () => {
            // if not get them from the api and add them to local storage
            const response = await fetch(`/.netlify/functions/netflix-films`);
            const response2 = await fetch(`/.netlify/functions/new-netflix-films`);
            const data = await response.json();
            console.log('data: ',data);
            const data2 = await response2.json();
            setFilms(data)
            setaddedLast7Days(data2.last7Days);
            setaddedLast30Days(data2.last30Days);
            window.localStorage.setItem("films", JSON.stringify(data));
            window.localStorage.setItem("addedLast7Days", JSON.stringify(data2.last7Days));
            window.localStorage.setItem("addedLast30Days", JSON.stringify(data2.last30Days));
            window.localStorage.setItem("updateDate", date);
        })();
    }, []);

    const setFilms = (films) => {
        setTopFilms(films);
        setfilmsRange2010_2020(getFilmsByDateRange(films, 2010, 2020));
        setfilmsRange2000_2010(getFilmsByDateRange(films, 2000, 2010));
        setfilmsRange1990_2000(getFilmsByDateRange(films, 1990, 2000));
        setfilmsRange1990_2000(getFilmsByDateRange(films, 1990, 2000));
    }

    const getFilmsByDateRange = (films, start, end) =>
        films
            .filter((film) => Number(film.released) >= start && Number(film.released <= end))
            .sort((a, b) => Number(a.released) - Number(b.released));

    console.log("topFilms: ", topFilms);
    console.log("addedLast7Days: ", addedLast7Days);

    return (
        <Wrapper>
            <AppHeader>
                <FilmCardWrapper heading={"All Top Films"} films={topFilms} />
                <FilmCardWrapper heading={"New (last 7 days)"} films={addedLast7Days} />
                <FilmCardWrapper heading={"New (last 30 days)"} films={addedLast30Days} />
                <FilmCardWrapper heading={"Films from 2010 - 2020"} films={filmsRange2010_2020} />
                <FilmCardWrapper heading={"Films from 2000 - 2010"} films={filmsRange2000_2010} />
                <FilmCardWrapper heading={"Films from 1990 - 2000"} films={filmsRange1990_2000} />
            </AppHeader>
            <GlobalStyles />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    /* background-color: green; */
`;
const AppHeader = styled.header`
    min-height: 100vh;
    max-width: 786px;
    margin-left: auto;
    margin-right: auto;
    font-size: calc(10px + 2vmin);
    padding: 0 16px;
`;

export default App;
