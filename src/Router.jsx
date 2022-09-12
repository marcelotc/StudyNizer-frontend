import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Subject } from './pages/Subject'

import { Main } from './pages/Main'

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Main />} />
                <Route path="/subject/:subject" element={<Subject />} />
            </Route>
        </Routes>
    )
}
