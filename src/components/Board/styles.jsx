
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 15px;
    height: 100%;
`;

export const Column= styled.div`
    width: 100%;
    padding: 10px;
`;

export const AddTaskContainer= styled.div`
    display: table;
    margin: 0 auto;

    button, input, select, .ant-select, .ant-picker {
        margin: 5px;
        width: 100%;
    }

    .ant-picker-dropdown, .ant-picker-dropdown-range, .ant-picker-dropdown-placement-bottomLeft  {
        height: 100% !important;
    }
`;

export const BoardContainer= styled.div`
    display: flex;
`;

export const Card = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: lightgray;
    padding: 10px 10px 0 10px;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;    
    flex-direction: column;
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px; 
    background: gray;
    padding: 5px;

    > div {
        display: flex;

        h3 {
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            margin-left: 8px;
            margin-bottom: 0;
        }

        span {
            background: #000;
            color: #fff;
            font-size: 12px;
            padding: 5px 10px 0px 10px;
            font-weight: bold;
            margin-left: 8px;
            margin-right: 8px;
            border-radius: 17px;
        }
    }

    svg {
        font-size: 25px;
        cursor: pointer;
    }
`;

export const Item = styled.div`
    position: relative;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 15px;
    box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
    border-top: 28px solid rgba(154, 155, 156, 0.226);
    min-height: 113px;
    
    span {
        display: block;
        float: right;
        position: relative;
        bottom: 40px;
        font-weight: bold;
        font-size: 15px;
        display: none;

        &:hover {
            color: red;
            transition: 0.2s;
        }
    }

    &:hover > span {
        cursor: grabbing;
        display: block;
    }

    & {
        background: ${props => props.isDragging ? 'rgba(218, 218, 221, 0.8)' : '' };
    }
`;
