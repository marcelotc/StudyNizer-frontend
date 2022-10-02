import { Route, Routes } from 'react-router-dom'

import { Board } from './pages/Board'
import { SubjectsList } from './pages/SubjectsList'
import { SubjectAnotations } from './pages/SubjectAnotations'
import { CalendComponent } from './pages/Calendar'

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Board />} />
            <Route path="/subjects-list" element={<SubjectsList />} />
            <Route path="/subject-anotations/:subject" element={<SubjectAnotations />} />
            <Route path="/subject-anotations/:subject/:subjectPage" element={<SubjectAnotations />} />
            <Route path="/calendar" element={<CalendComponent />} />
        </Routes>
    )
}
