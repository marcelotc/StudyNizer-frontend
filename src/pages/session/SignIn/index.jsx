import { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input, Button, notification, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { setCalendarDate } from '../../../store/modules/userSession/actions';
import { Container, LoginContainer } from './styles';
import api from '../../../services/api';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;

export const SignIn = ({ signed }) => {
    const [loginPaylod, setLoginPaylod] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    if (signed) {
        return <Navigate to={"/"} replace />
    }

    const handleSignIn = async () => {
        try {
            setLoading(true);
            const res = await api.post('/user/login', {
                email: loginPaylod.email,
                password: loginPaylod.password
            })
            dispatch(setCalendarDate(res?.data));
            localStorage.setItem('@StudyNizer:userSession', JSON.stringify(res?.data));
            setLoading(false);
        } catch (error) {
            notification.info({
                message: `${error?.response?.data?.error === undefined ? 'Serviço indisponível' : error?.response?.data?.error}`,
                placement: 'top',
            });
            setLoading(false);
        }
    }

    const textsBlank = loginPaylod.email?.trim() === "" || loginPaylod.password?.trim() === "";

    return (
        <Container>
            <div className="logo"><h1>StudyNizer</h1></div>
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
                <Button disabled={textsBlank ? true : false} type='primary' onClick={handleSignIn}>{!loading ? 'Entrar' : <Spin indicator={antIcon} />}</Button>
                <NavLink to={'/sign-up'}>
                    <Button>Cadastrar</Button>
                </NavLink>
            </LoginContainer>
        </Container>
    );
}