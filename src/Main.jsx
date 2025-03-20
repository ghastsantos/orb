import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/global';
import theme from './styles/theme';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';

function App() {
    const [currentPage, setCurrentPage] = useState('login');

    const handleNavigation = (page) => {
        setCurrentPage(page); 
    };

    return (
        <>
            {currentPage === 'login' && <SignIn onNavigate={handleNavigation} />}
            {currentPage === 'signup' && <SignUp onNavigate={handleNavigation} />}
            {currentPage === 'home' && <Home onNavigate={handleNavigation} />}
        </>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);