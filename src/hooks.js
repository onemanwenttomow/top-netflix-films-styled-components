import { useRef, useEffect, useState } from "react";

export function useElementOnScreen(options) {
    const [numberToShow, setNumberToShow] = useState(10);

    const scrollContainer = useRef(null);
    useEffect(() => {
        const filmToWatch = scrollContainer.current.children[numberToShow - 1];
        if (!filmToWatch) {
            return;
        }
        let callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    observer.unobserve(filmToWatch);
                    setNumberToShow((num) => (num += 10));
                }
            });
        };
        let observer = new IntersectionObserver(callback, options);
        filmToWatch && observer.observe(filmToWatch);

        return () => filmToWatch && observer.observe(filmToWatch);
    }, [numberToShow, options]);
    return [scrollContainer, numberToShow];
}
