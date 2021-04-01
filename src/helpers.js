const parser = new DOMParser();
exports.parseText = (str) =>
    parser.parseFromString(`<!doctype html><body>${str}`, "text/html").body.textContent;

exports.todaysDate = () =>
    new Date().toLocaleDateString("en-UK", {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    });

exports.getFilmsByDateRange = (films, start, end) =>
    films
        .filter((film) => Number(film.released) >= start && Number(film.released <= end))
        .sort((a, b) => Number(a.released) - Number(b.released));
