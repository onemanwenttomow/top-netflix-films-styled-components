import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

function FilmCard(props) {
    const imdbid = props.match.params.id;
    useEffect(() => {
        console.log("imdbid: ", imdbid);
        (async () => {
            const response = await fetch(`/.netlify/functions/extra-film-data?id=${imdbid}`);
            const data = await response.json();
            console.log('data: ',data);

        })()
    }, [imdbid]);
    return <Wrapper>
        <Link to="/">
            Modal 
        </Link>
    </Wrapper>;
}

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: cadetblue;
`;

export default FilmCard;
