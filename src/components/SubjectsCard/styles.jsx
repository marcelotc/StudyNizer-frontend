import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

export const CardContainer = styled.div`
    margin: 20px;
    background: lightgray;
    border-radius: 10px;

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
    margin: 20px;
    border-radius: 10px;
    height: 350px;
    width: 238px;

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
`;

export const AddSubjectModal = styled.div`
    button, input {
        margin: 5px;
        width: 100%;
    }
`;