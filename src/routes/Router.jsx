import { Route, Routes } from 'react-router-dom'

import { SignIn } from '../pages/session/SignIn'
import { SignUp } from '../pages/session/SignUp'
import { Board } from '../pages/Board'
import { SubjectsList } from '../pages/SubjectsList'
import { SubjectAnnotations } from '../pages/SubjectAnnotations'
import { CalendComponent } from '../pages/Calendar'
import { AuthLayout } from './AuthLayout'

export function Router() {
    //const { signed } = store.getState().auth;
    const signed = true;

    return (
        <Routes>
            <Route path="/sign-in" element={<SignIn signed={signed} />} />
            <Route path="/sign-up" element={<SignUp signed={signed} />} />
            <Route path="/" element={<AuthLayout signed={signed} />}>
                <Route path="/" element={<Board />} />
                <Route path="/subjects-list" element={<SubjectsList />} />
                <Route path="/subject-annotations/:subject" element={<SubjectAnnotations />} />
                <Route path="/subject-annotations/:subject/:subjectPage" element={<SubjectAnnotations />} />
                <Route path="/calendar" element={<CalendComponent />} />
            </Route>
        </Routes>
    )
}
