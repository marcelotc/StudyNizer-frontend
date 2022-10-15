import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import { Router } from './routes/Router'

import { GlobalStyle } from './styles/globalStyles'
import { defaultTheme } from './styles/themes/default'

export default function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
            <GlobalStyle />
        </ThemeProvider>
    )
}
