
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 15px;
    height: 100%;

    &:hover {
    cursor: grabbing;
    }
`;

export const Column= styled.div`
    width: 100%;
    padding: 10px;
`;

export const AddTaskContainer= styled.div`
    display: table;
    margin: 0 auto;
    width: 50%;

    button, input {
        margin: 5px;
        width: 100%;
    }
`;

export const BoardContainer= styled.div`
    display: flex;
`;

export const Card = styled.div`
    width: 100%;
    height: 100%;
    background-color: lightgray;
    padding: 10px 10px 0 10px;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
`;

export const Item = styled.div`
    position: relative;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 15px;
    box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
    border-top: 20px solid rgba(154, 155, 156, 0.226);
    min-height: 113px;
    
    &:hover {
        cursor: grabbing;
    }

    & {
        background: ${props => props.isDragging ? 'rgba(218, 218, 221, 0.8)' : '' };
    }
`;
