import styled from "styled-components/macro";

function Trailer({ videos }) {
    function findTrailer(videos) {
        console.log("videos: ", videos);
        if (videos.length === 1) {
            return videos[0]?.key;
        }
        const trailer = videos.find((video) => video.name.toLowerCase().includes("trailer"));
        return trailer ? trailer.key : videos[0]?.key;
    }

    return (
        <TrailerWrapper
            title="trailer"
            id="ytplayer"
            type="text/html"
            src={`https://www.youtube.com/embed/${findTrailer(videos)}`}
            frameBorder="0"
        ></TrailerWrapper>
    );
}

const TrailerWrapper = styled.iframe`
    width: calc(100% + 16px);
    margin-left: -8px;
    aspect-ratio: 16 / 9;
`;

export default Trailer;
