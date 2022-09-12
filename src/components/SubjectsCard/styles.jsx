import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 100px;
`;

export const CardLink = styled(NavLink)`
    .subjectCard {
        margin: 20px;
        background: lightgray;
        border-radius: 10px;
    }
`;