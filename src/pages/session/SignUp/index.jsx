import { useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Input, Button, notification } from 'antd';
import { Container, LoginContainer } from './styles';
import api from '../../../services/api';


export const SignUp = ({ signed }) => {
    const navigate = useNavigate();
    const [loginPaylod, setLoginPaylod] = useState({
        name: '',
        email: '',
        password: '',
    });

    if (signed) {
        return <Navigate to={"/"} replace />
    }

    const handleSignUp = async () => {
        try {
            const res = await api.post('/user/register', {
                name: loginPaylod.name,
                email: loginPaylod.email,
                password: loginPaylod.password
            })
            notification.success({
                message: `Usuário cadastrado!`,
                placement: 'top',
            });
            navigate("/sign-in");
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
            <div className="logo"><h1>StudyNizer</h1></div>
            <LoginContainer>
                <h1>Cadastro</h1>
                <Input
                    placeholder='nome'
                    value={loginPaylod.name}
                    onChange={(e) => setLoginPaylod({ ...loginPaylod, name: e.target.value })}
                />
                <Input
                    placeholder='Email'
                    value={loginPaylod.email}
                    onChange={(e) => setLoginPaylod({ ...loginPaylod, email: e.target.value })}
                />
                <Input
                    placeholder='Senha'
                    value={loginPaylod.password}
                    onChange={(e) => setLoginPaylod({ ...loginPaylod, password: e.target.value })}
                />
                <Button disabled={textsBlank ? true : false} type='primary' onClick={handleSignUp}>Cadastrar</Button>
                <NavLink to={'/sign-in'}>
                    <Button>Login</Button>
                </NavLink>
            </LoginContainer>
        </Container>
    );
}