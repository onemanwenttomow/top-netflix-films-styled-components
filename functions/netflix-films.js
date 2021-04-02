const axios = require("axios");
const RAPIDAPIKEY = process.env.RAPIDAPIKEY;

exports.handler = async (event, context) => {
    try {
        const films = await getAllFilms();
        return {
            statusCode: 200,
            body: JSON.stringify(films)
        };
    } catch (error) {
        console.log("error: ", error);
    }
};

let films = [];
var options = {
    headers: {
        "X-RapidAPI-Host": "unogs-unogs-v1.p.rapidapi.com",
        "X-RapidAPI-Key": RAPIDAPIKEY
    }
};
const imdbVotes = "gt100000";
const startYear = "1980";
const endYear = "2021";
const minImdbRating = "7";
let p = 1;

async function getAllFilms() {
    let url = `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew4000-!${startYear},${endYear}-!0,5-!${minImdbRating},10-!0-!Movie-!Any-!Any-!${imdbVotes}&t=ns&cl=39&st=adv&ob=Rating&p=${p}&sa=and`;
    const { data } = await axios.get(url, options);
    films = [...films, ...data.ITEMS];
    if (data.COUNT > films.length) {
        ++p;
        return getAllFilms();
    }
    return films;
}
