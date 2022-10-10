
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    margin-left: 15px;

    a {
        color: #000;
        text-decoration: none;
        font-weight: bold;
        margin: 10px 40px;
        border: 1px solid lightgray;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        padding: 8px 20px;
    }

    a.active {
        background: #000;
        color: #fff; 
    }

    a:hover {
        background: #000;
        color: #fff; 
        text-decoration:none; 
        cursor:pointer;  
        transition: 0.3s;
    }

    @media (max-width: 990px) {
        flex-direction: column;
        text-align: center;
    }
`;