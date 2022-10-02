import { Route, Routes } from 'react-router-dom'

import { Board } from './pages/Board'
import { SubjectsList } from './pages/SubjectsList'
import { SubjectAnotations } from './pages/SubjectAnotations'
import { CalendComponent } from './pages/Calendar'

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Board />} />
            <Route path="/subjectsList" element={<SubjectsList />} />
            <Route path="/subjectAnotations/:subject" element={<SubjectAnotations />} />
            <Route path="/subjectAnotations/:subject/:subjectPage" element={<SubjectAnotations />} />
            <Route path="/calendar" element={<CalendComponent />} />
        </Routes>
    )
}
