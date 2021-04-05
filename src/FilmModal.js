import styled from "styled-components/macro";

function FilmCard({ closeModal, id }) {
    return <Wrapper onClick={closeModal}>Modal - { id }</Wrapper>;
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
