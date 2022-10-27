import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;

    .logo {
        background: black;
        width: 50%;
        text-align: center;
        margin-top: 10px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;      

        h1 {
            color: white;
            font-weight: bold;
            margin: 0;
            padding: 10px;
        }
    }
`;

export const LoginContainer = styled.div`
    text-align: center;
    background: lightgray;
    border-radius: 5px;
    padding: 50px;
    width: 50%;

    h1 {
        font-weight: bold;
    }

    input, button {
        margin: 10px 0;
        width: 100%;
    }
`;