import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/global';
import theme from './styles/theme';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { Crud } from './pages/Crud';
import { CrudNews } from './pages/CrudNews';
import { NewsPage } from './pages/NewsPage';
import { Profile } from './pages/Profile';

function App() {
    const [currentPage, setCurrentPage] = useState('login');
    const [usuario, setUsuario] = useState(null);
    const [imgVersion, setImgVersion] = useState(Date.now());

    // Quando o usuário atualizar a foto:
    const handleFotoAtualizada = () => {
        setImgVersion(Date.now());
        // Se precisar atualizar o usuário, faça aqui também
    };

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
            {currentPage === 'crudNews' && <CrudNews onNavigate={handleNavigation}/>}
            {currentPage === 'newsPage' && (
                <NewsPage
                    onNavigate={handleNavigation}
                    usuario={usuario}
                    imgVersion={imgVersion}
                />
            )}
            {currentPage === 'profile' && (
                <Profile
                    onNavigate={handleNavigation}
                    usuario={usuario}
                    imgVersion={imgVersion}
                    onFotoAtualizada={handleFotoAtualizada}
                />
            )}
            {currentPage === 'home' && (
                <Home
                    onNavigate={handleNavigation}
                    usuario={usuario}
                    imgVersion={imgVersion}
                />
            )}
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