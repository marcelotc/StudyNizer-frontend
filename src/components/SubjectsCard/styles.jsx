import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 100px;

    .subjectCard {
        width: 20%;
        height: 20%;
        margin: 20px;
        background: lightgray;
        border-radius: 10px;
    }
`;
