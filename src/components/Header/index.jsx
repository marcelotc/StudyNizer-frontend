import React from 'react';
import { NavLink } from 'react-router-dom';

import { Container } from './styles';

export const Header = () => (
    <Container>
        <NavLink to={'/'} activeClassName="active">Board</NavLink>
        <NavLink to={'/SubjectsList'} activeClassName="active">Disciplinas</NavLink>
        <NavLink to={'/calendar'} activeClassName="active">Calendário</NavLink>
    </Container>
);
