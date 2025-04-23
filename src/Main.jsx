import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/global';
import theme from './styles/theme';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { Crud } from './pages/Crud';

function App() {
    const [currentPage, setCurrentPage] = useState('login');
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const storedPage = localStorage.getItem("currentPage");
        const storedUsuario = localStorage.getItem("usuario");

        if (storedPage && storedUsuario) {
            setCurrentPage(storedPage);
            setUsuario(JSON.parse(storedUsuario));
        }
    }, []);
   
    useEffect(() => {
        if (usuario) {
            sessionStorage.setItem('usuario', JSON.stringify(usuario));
            sessionStorage.setItem('currentPage', currentPage);
        }
    }, [usuario, currentPage]);
   
   
     const handleNavigation = (page, usuarioData = null) => {
        setCurrentPage(page);
        localStorage.setItem("currentPage", page);

        if (usuarioData) {
            setUsuario(usuarioData);
            localStorage.setItem("usuario", JSON.stringify(usuarioData));
        }

        if (page === 'login') {
            localStorage.removeItem("usuario");
            localStorage.removeItem("currentPage");
        }
    };

    return (
        <>
            {currentPage === 'login' && <SignIn onNavigate={handleNavigation} />}
            {currentPage === 'signup' && <SignUp onNavigate={handleNavigation} />}
            {currentPage === 'crud' && <Crud onNavigate={handleNavigation}/>}
            {currentPage === 'home' && <Home onNavigate={handleNavigation} usuario={usuario} />}
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
