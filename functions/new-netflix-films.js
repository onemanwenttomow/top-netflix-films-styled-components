const axios = require("axios");
const RAPIDAPIKEY = process.env.RAPIDAPIKEY;

console.log('RAPIDAPIKEY: ',RAPIDAPIKEY);

var options = {
    headers: {
        "x-rapidapi-key": RAPIDAPIKEY,
        "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com"
    }
};

exports.handler = async (event, context) => {
    console.log("new netflix films");
    try {
        let [{ data: last7Days }, { data: last30Days }] = await Promise.all([
            axios.get(
                `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get:new7:DE&p=1&t=ns&st=adv`,
                options
            ),
            axios.get(
                `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get:new30:DE&p=1&t=ns&st=adv`,
                options
            )
        ]);
        last7Days = filterAndSort(last7Days.ITEMS);
        last30Days = filterAndSort(last30Days.ITEMS);
        return {
            statusCode: 200,
            body: JSON.stringify({ last7Days, last30Days })
        };
    } catch (error) {
        console.log("error: ", error);
    }
};

function filterAndSort(films) {
    return films.filter((film) => film.rating && Number(film.rating > 6)).sort(
        (a, b) => Number(b.rating) - Number(a.rating)
    );
}
