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
            <div className='logo'><h1>StudyNizer</h1></div>
            <Menu>
                <NavLink to={'/'} activeClassName="active">Board</NavLink>
                <NavLink to={'/subjects-list'} activeClassName="active">Disciplinas</NavLink>
                <NavLink to={'/calendar'} activeClassName="active">Agenda</NavLink>
            </Menu>
            <LogOut>
                <NavLink to={'#'} onClick={handleClearSession}>Sair</NavLink>
            </LogOut>
        </Container>
    );
};
