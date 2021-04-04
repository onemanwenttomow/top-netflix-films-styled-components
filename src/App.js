import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import GlobalStyles from "./GlobalStyles";
import FilmCardWrapper from "./FilmCardWrapper";
import { todaysDate, getFilmsByDateRange } from "./helpers";

function App() {
    const [topFilms, setTopFilms] = useState([]);
    const [addedLast7Days, setaddedLast7Days] = useState([]);
    const [addedLast30Days, setaddedLast30Days] = useState([]);

    useEffect(() => {
        // create todays date
        const date = todaysDate();
        // check if films have already been added for todays date
        if (date === window.localStorage.getItem("updateDate")) {
            // if so get them from local strorage
            console.log("from local");
            setTopFilms(JSON.parse(window.localStorage.getItem("films")));
            setaddedLast7Days(JSON.parse(window.localStorage.getItem("addedLast7Days")));
            setaddedLast30Days(JSON.parse(window.localStorage.getItem("addedLast30Days")));
            return;
        }
        (async () => {
            // if not get them from the api and add them to local storage
            const [response, response2] = await Promise.all([
                fetch(`/.netlify/functions/netflix-films`),
                fetch(`/.netlify/functions/new-netflix-films`)
            ]);
            const [data, data2] = await Promise.all([response.json(), response2.json()]);
            setTopFilms(data);
            setaddedLast7Days(data2.last7Days);
            setaddedLast30Days(data2.last30Days);
            window.localStorage.setItem("films", JSON.stringify(data));
            window.localStorage.setItem("addedLast7Days", JSON.stringify(data2.last7Days));
            window.localStorage.setItem("addedLast30Days", JSON.stringify(data2.last30Days));
            window.localStorage.setItem("updateDate", date);
        })();
    }, []);

    console.log("topFilms: ", topFilms);
    console.log("addedLast7Days: ", addedLast7Days);

    // maybe add a loading component while it fetches the data...
    if (!topFilms.length) {
        return null;
    }
    return (
        <>
            <AppHeader>
                <MainHeading>Top Netflix Films</MainHeading>
                <FilmCardWrapper heading={"All Top Films"} films={topFilms} />
                <FilmCardWrapper
                    heading={"New (last 7 days)"}
                    films={addedLast7Days}
                />
                <FilmCardWrapper
                    heading={"New (last 30 days)"}
                    films={addedLast30Days}
                />
                <FilmCardWrapper
                    heading={"Films from 2010 - 2020"}
                    films={getFilmsByDateRange(topFilms, 2010, 2020)}
                    defaultSort="year"
                />
                <FilmCardWrapper
                    heading={"Films from 2000 - 2010"}
                    films={getFilmsByDateRange(topFilms, 2000, 2010)}
                    defaultSort="year"
                />
                <FilmCardWrapper
                    heading={"Films from 1990 - 2000"}
                    films={getFilmsByDateRange(topFilms, 1990, 2000)}
                    defaultSort="year"
                />
            </AppHeader>
            <GlobalStyles />
        </>
    );
}

const MainHeading = styled.h1`
    margin: 32px 0;
`;

const AppHeader = styled.header`
    min-height: 100vh;
    max-width: 786px;
    margin-left: auto;
    margin-right: auto;
    /* font-size: calc(10px + 2vmin); */
    padding: 0 16px;
    color: hsl(0, 0%, 20%);
`;

export default App;
