import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    margin-top: 60px;
`;

export const InnerContainer = styled.div`
    width: 86.5%;
`;

export const CardContainerList = styled.div`
    display: flex;
    flex-wrap: wrap;
    -webkit-box-align: center;
    align-items: center;
    align-content: center;

    @media (max-width: 393px) {
        display: unset;
    }
`;

export const CardContainer = styled.div`
    margin: 20px;
    background: lightgray;
    border-radius: 10px;
    margin: 0px 30px 30px 0px;
    width: calc(20% - 30px);

    > div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 30px;

        background: #c3c3c3;

        > svg {
            color: #000;
            font-size: 18px;
            margin-right: 10px;
            cursor: pointer;
        }
    }

    @media (max-width: 990px) {
        width: calc(50% - 30px);
        margin: 0 15px 30px 15px;
    }
    @media (max-width: 510px) {
        width: 100%;
    }
    @media (max-width: 394px) {
        margin: 30px 0 30px 0;
    }
`;

export const CardLink = styled(NavLink)`

`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    
    &:hover {
        opacity: 0.3;
        transition: 0.4s;
    }
`;

export const AddCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed black;
    border-radius: 10px;
    height: 298px;
    width: calc(20% - 30px);

    &:hover {
        cursor: pointer;
        background: #ebeaea;
        transition: 0.4s;

        > svg {
            color: #d5f395;
            transition: 0.4s;
        }
    }

    > svg {
        font-size: 100px;
        color: #BEEC5A;
    }

    @media (max-width: 990px) {
        width: calc(50% - 30px);
        margin: 0 15px 30px 15px;
    }
    @media (max-width: 510px) {
        width: 100%;
    }
    @media (max-width: 394px) {
        margin: 30px 0 30px 0;
    }
`;

export const AddSubjectModal = styled.div`
    button, input {
        margin: 5px;
        width: 100%;
    }
`;