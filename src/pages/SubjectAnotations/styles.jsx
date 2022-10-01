import styled from 'styled-components'
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
    height: 100%;
`
export const TextAreaContainer = styled.div`
    height: 100%;
`

export const BackButton = styled(NavLink)`
    font-size: 20px;
    font-weight: bold;
    color: #000;
    margin-left: 20px;

    > svg {
        margin: 0 11px -3px 0;
    }

    &:hover {
        color: gray;
    }
`