const axios = require("axios");
const OMDB = process.env.OMDB;
const TMDB = process.env.TMDB;

exports.handler = async (event, context) => {
    try {
        const { id } = event.queryStringParameters;
        const url = `http://www.omdbapi.com/?i=${id}&apikey=${OMDB}`;
        const url2 = `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos&language=en-US&api_key=${TMDB}`;
        const [response1, response2] = await Promise.all([axios.get(url), axios.get(url2)]);
        const data = {
            ...response1.data,
            ...response2.data
        };
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 200,
            body: JSON.stringify({ status: error.response.status, error: true })
        };
    }
};
