import { Container } from './styles';
import { Header } from '../../components/Header';
import { Pomodoro } from '../../components/Pomodoro';

export const PomodoroComponent = () => {
    

    return (
        <Container>
            <Header />
            <Pomodoro />
        </Container>
    );
}