const axios = require("axios");
const RAPIDAPIKEY = process.env.RAPIDAPIKEY;

var options = {
    method: "GET",
    url: "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi",
    params: { q: "get:new7:DE", p: "1", t: "ns", st: "adv" },
    headers: {
        "x-rapidapi-key": RAPIDAPIKEY,
        "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com"
    }
};

exports.handler = async (event, context) => {
    console.log('new netflix films');
    try {
        const { data } = await axios.get(
            `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get:new7:DE&p=1&t=ns&st=adv`,
            options
        );
        console.log('data: ', data);
        const filmsWithRating = data.ITEMS.filter((film) => film.rating).sort(
            (a, b) => Number(b.rating) - Number(a.rating)
        );
        return {
            statusCode: 200,
            body: JSON.stringify(filmsWithRating)
        };
    } catch (error) {
        console.log("error: ", error);
    }
};

