import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { SignIn } from '../pages/session/SignIn'
import { SignUp } from '../pages/session/SignUp'
import { Board } from '../pages/Board'
import { SubjectsList } from '../pages/SubjectsList'
import { SubjectAnnotations } from '../pages/SubjectAnnotations'
import { CalendComponent } from '../pages/Calendar'
import { PomodoroComponent } from '../pages/Pomodoro'
import { AuthLayout } from './AuthLayout'

export function Router() {
    const userSessionStorage = JSON.parse(localStorage.getItem('@StudyNizer:userSession'));
    const userSession = useSelector(state => state.userSession.userInfo);
    
    let signed = userSessionStorage?.token || userSession?.token;
   
    return (
        <Routes>
            <Route path="/sign-in" element={<SignIn signed={signed} />} />
            <Route path="/sign-up" element={<SignUp signed={signed} />} />
            <Route path="/" element={<AuthLayout signed={signed} />}>
                <Route path="/" element={<Board />} />
                <Route path="/subjects-list" element={<SubjectsList />} />
                <Route path="/subject-annotations/:subject" element={<SubjectAnnotations />} />
                <Route path="/subject-annotations/:subject/:subjectPage" element={<SubjectAnnotations />} />
                <Route path="/agenda" element={<CalendComponent />} />
                <Route path="/pomodoro" element={<PomodoroComponent />} />
            </Route>
        </Routes>
    )
}
