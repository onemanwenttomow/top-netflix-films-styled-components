import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import Trailer from "./Trailer";

const logos = {
    "Internet Movie Database": "/imdb.png",
    "Rotten Tomatoes": "/rt.png",
    "Metacritic": "/mc.png"
}

function FilmCard(props) {
    const imdbid = props.match.params.id;
    const [filmData, setFilmData] = useState(null);
    const [errorStatus, setErrorStatus] = useState(null);
    useEffect(() => {
        (async () => {
            const response = await fetch(`/.netlify/functions/extra-film-data?id=${imdbid}`);
            const data = await response.json();
            console.log("data: ", data);
            if (data.error) {
                setErrorStatus(data.status);
                return;
            }
            setFilmData(data);
        })();
    }, [imdbid]);

    if (errorStatus === 404) {
        return (
            <Wrapper>
                <Link to="/">
                    Sorry, we could not find any extra info about this film. Please return to the
                    homepage
                </Link>
            </Wrapper>
        );
    }

    if (!filmData) {
        return null;
    }

    return (
        <Wrapper>
            <CloseIcon to="/">X</CloseIcon>
            <Header>
                <MiniPoster src={filmData.Poster} alt={filmData.Title} />
                <HeaderContent>
                    <MainHeading>{filmData.Title}</MainHeading>
                    <ExtraInfo>
                        <InfoItem>{filmData.Rated}</InfoItem>
                        <InfoItem>{filmData.Released}</InfoItem>
                        <InfoItem>{filmData.Genre}</InfoItem>
                        <InfoItem>{filmData.Runtime}</InfoItem>
                    </ExtraInfo>
                </HeaderContent>
            </Header>
            <Trailer videos={filmData.videos?.results} />
            <IconsWrapper>
                {filmData.Ratings.map((score) => (
                    <span key={score.Source}>
                        <img src={logos[score.Source]} alt={score.Source} />
                        <span>
                            {" "}
                             {score.Value}{" "}
                        </span>
                    </span>
                ))}
            </IconsWrapper>
            <div>{filmData.Plot}</div>
            <a href={`https://www.netflix.com/watch/${filmData.netflixid}`}>Watch on Netflix</a>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: relative;
    margin-top: 16px;
    background-color: white;
    padding: 8px;
`;

const Header = styled.header`
    display: flex;
    padding-bottom: 8px;
`;

const CloseIcon = styled(Link)`
    position: absolute;
    top: -16px;
    right: -16px;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    background-color: hsl(0, 0%, 40%);
    color: white;
    font-weight: bold;
    &:visited {
        color: white;
    }
`;

const MiniPoster = styled.img`
    height: 48px;
`;

const HeaderContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 8px;
`;

const MainHeading = styled.h1`
    font-size: 20px;
`;

const ExtraInfo = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
`;

const InfoItem = styled.p`
    padding: 0 16px;
    &:first-of-type {
        padding-left: 0;
    }
`;

const IconsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 8px 0;
`



export default FilmCard;
