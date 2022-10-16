import { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCalendarDate } from '../../../store/modules/userSession/actions';
import { Input, Button, notification } from 'antd';
import { Container, LoginContainer } from './styles';
import api from '../../../services/api';


export const SignIn = ({ signed }) => {
    const [loginPaylod, setLoginPaylod] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();

    if (signed) {
        return <Navigate to={"/"} replace />
    }

    const handleSignIn = async () => {
        try {
            const res = await api.post('/user/login', {
                email: loginPaylod.email,
                password: loginPaylod.password
            })
            dispatch(setCalendarDate(res?.data));
            localStorage.setItem('@StudyNizer:userSession', JSON.stringify(res?.data));
        } catch (error) {
            notification.info({
                message: `${error?.response?.data?.error}`,
                placement: 'top',
            });
        }
    }

    const textsBlank = loginPaylod.email?.trim() === "" || loginPaylod.password?.trim() === "";

    return (
        <Container>
            <LoginContainer>
                <h1>Login</h1>
                <Input 
                    placeholder='Email' 
                    value={loginPaylod.email} 
                    onChange={(e) => setLoginPaylod({ ...loginPaylod, email: e.target.value }) } 
                />
                <Input 
                    placeholder='Senha' 
                    value={loginPaylod.password} 
                    onChange={(e) => setLoginPaylod({ ...loginPaylod, password: e.target.value }) } 
                />
                <Button disabled={textsBlank ? true : false} type='primary' onClick={handleSignIn}>Entrar</Button>
                <NavLink to={'/sign-up'}>
                    <Button>Cadastrar</Button>
                </NavLink>
            </LoginContainer>
        </Container>
    );
}