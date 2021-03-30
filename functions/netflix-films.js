const axios = require("axios");
const RAPIDAPIKEY = process.env.RAPIDAPIKEY;
var options = {
    headers: {
        "X-RapidAPI-Host": "unogs-unogs-v1.p.rapidapi.com",
        "X-RapidAPI-Key": RAPIDAPIKEY
    }
};
const imdbVotes = "gt100000";
const startYear = "1980";
const endYear = "2021";
const minImdbRating = "7.5";

const url = `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew4000-!${startYear},${endYear}-!0,5-!${minImdbRating},10-!0-!Movie-!Any-!Any-!${imdbVotes}&t=ns&cl=39&st=adv&ob=Rating&p=1&sa=and`;

exports.handler = async (event, context) => {
    try {
        const { data } = await axios.get(url, options);
        // update to get more data if there are more than 100 results
        // console.log('data: ',data);
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.log("error: ", error);
    }
};
