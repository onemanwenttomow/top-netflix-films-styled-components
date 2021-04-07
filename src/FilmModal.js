import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

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
                console.log("data.status: ", data.status);
                // return window.location.replace("/");
                setErrorStatus(data.status);
                return;
            }
            setFilmData(data);
        })();
    }, [imdbid]);

    console.log("errorStatus: ", errorStatus);

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
            <div>
                <Trailer
                    title="trailer"
                    id="ytplayer"
                    type="text/html"
                    src={`https://www.youtube.com/embed/${filmData.videos?.results[0]?.key}`}
                    frameBorder="0"
                ></Trailer>
                Youtube id - {filmData.videos?.results[0]?.id} {filmData.videos?.results[0]?.site}
            </div>
            <div>
                {filmData.Ratings.map((score) => (
                    <p key={score.Source}>
                        {" "}
                        {score.Source} - {score.Value}{" "}
                    </p>
                ))}
            </div>
            <div>{filmData.Plot}</div>
            <a href={`https://www.netflix.com/watch/${filmData.netflixid}`}>Watch on Netflix</a>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: relative;
    margin-top: 16px;
    background-color: white;
`;

const Header = styled.header`
    display: flex;
    padding: 8px 0 8px 8px;
`

const CloseIcon = styled(Link)`
    position: absolute;
    top: -16px;
    right: -8px;
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
`

const HeaderContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 8px;
`

const MainHeading = styled.h1`
    font-size: 20px;
`

const ExtraInfo = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
`

const InfoItem = styled.p`
    padding: 0 16px;
    &:first-of-type {
        padding-left: 0;
    }
`

const Trailer = styled.iframe`
    width: 100%;
    aspect-ratio: 16 / 9;
`;

export default FilmCard;
