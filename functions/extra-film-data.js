const axios = require("axios");
const OMDB = process.env.OMDB;

exports.handler = async (event, context) => {
    const { id } = event.queryStringParameters;
    console.log("id: ", id);
    const url = `http://www.omdbapi.com/?i=${id}&apikey=${OMDB}`;
    console.log(`http://www.omdbapi.com/?i=${id}&apikey=${OMDB}`);

    const { data } = await axios.get(url);
    console.log('data: ',data);

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
};
