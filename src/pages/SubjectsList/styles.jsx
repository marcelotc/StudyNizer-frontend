import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`

`;

export const ListContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const ListInnerContainer = styled.div`
    width: 86.5%;

    .subjectsEmpty {
        text-align: center;
        margin-top: 20px;
        font-size: 20px;
    }
`;

export const CardContainerList = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    align-items: stretch;

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
            display: none;
            font-size: 16px;
            margin-right: 10px;
            cursor: pointer;
        }

        /*> svg:nth-child(1):hover {
            color: blue;
            cursor: pointer;
            transition: 0.2s;
        }*/

        > svg:nth-child(1):hover {
            color: red;
            cursor: pointer;
            transition: 0.2s;
        }
    }

    &:hover > div {
        > svg {
            display: unset;
        }
    }
    

    @media (max-width: 990px) {
        width: 100%;
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
    

    > p {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #000;
        font-weight: bold;
        font-size: 23px;
        text-align: center;
    }
    
    &:hover {
        opacity: 0.3;
        transition: 0.4s;
    }
`;

export const AddCard = styled.div`
    display: ${props => props.isSubjectsEmpty ? 'table' : 'unset'};
    border-radius: 10px;
    margin:${props => props.isSubjectsEmpty ? '0 auto' : '0px 30px 30px 0px'};
    width: calc(20% - 30px);
    border: 3px dashed lightgray;

    &:hover {
        cursor: pointer;
        background: #ebeaea;
        transition: 0.4s;

        > svg {
            color: #d5f395;
            transition: 0.4s;
        }
    }

    .addCardHeader {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 30px;
    }

    .addCardBody {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        border-radius: 10px;

        > svg {
            font-size: 100px;
            color: #BEEC5A;
            margin-bottom: 50px;
        }
    }
    

    @media (max-width: 990px) {
        width: 100%;
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