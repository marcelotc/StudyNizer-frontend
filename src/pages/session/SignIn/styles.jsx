import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
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

    a {
        width: 50%;
    }
`;