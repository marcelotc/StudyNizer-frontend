import React from 'react';
import { NavLink } from 'react-router-dom';

import { Container, Menu, LogOut } from './styles';

export const Header = () => {

    const handleClearSession = () => {
        localStorage.removeItem('@StudyNizer:userSession');
        window.location.reload();
    }

    return (
        <Container>
            <div></div>
            <Menu>
                <NavLink to={'/'} activeClassName="active">Board</NavLink>
                <NavLink to={'/subjects-list'} activeClassName="active">Disciplinas</NavLink>
                <NavLink to={'/calendar'} activeClassName="active">Calendário</NavLink>
            </Menu>
            <LogOut>
                <NavLink onClick={handleClearSession}>Sair</NavLink>
            </LogOut>
        </Container>
    );
};
