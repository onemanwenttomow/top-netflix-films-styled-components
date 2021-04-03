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

exports.sortFilmsAscending = (films) =>
    films.sort((a, b) => Number(a.released) - Number(b.released));
exports.sortFilmsDescending = (films) =>
    films.sort((a, b) => Number(b.released) - Number(a.released));
exports.sortFilmsByRating = (films) => films.sort((a, b) => Number(b.rating) - Number(a.rating));
