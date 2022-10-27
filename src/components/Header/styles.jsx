
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
        width: 40%;

        h1 {
            border-radius: 4px;
            margin: 0 0 30px 30px;
            font-weight: bold;
            background: black;
            color: white;
            text-align: center;
            padding: 0 50px;
        }
    }

    @media (max-width: 990px) {
        flex-direction: column;
        text-align: center;

        .logo {
            width: 100%;

            h1 {
                margin: 0 0 30px 0;
                border-radius: 0;
            }
        }
    }
`;

export const Menu = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    width: 100%;

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

export const LogOut = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    margin-left: 60px;

    a {
        color: #000;
        text-decoration: none;
        font-weight: bold;
        margin-left: 10px;
        margin-right: 66px;        
        border: 1px solid lightgray;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        padding: 8px 20px;
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