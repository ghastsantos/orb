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
import { Header } from './components/Header';
import axios from 'axios';

function App() {
    const [currentPage, setCurrentPage] = useState('login');
    const [usuario, setUsuario] = useState(null);
    const [imgVersion, setImgVersion] = useState(Date.now());

    const handleFotoAtualizada = () => {
        setImgVersion(Date.now());
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
            localStorage.setItem('usuario', JSON.stringify(usuario));
            localStorage.setItem('currentPage', currentPage);
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
            setUsuario(null);
            localStorage.removeItem("usuario");
            localStorage.removeItem("currentPage");
        }
    };

    // Atualiza o usuário global após edição de perfil
    const handleUsuarioAtualizado = async () => {
        if (usuario?.id) {
            const res = await axios.get(`http://localhost:3000/api/usuario`);
            const userAtualizado = res.data.find(u => u.id === usuario.id);
            if (userAtualizado) {
                setUsuario(userAtualizado);
                localStorage.setItem("usuario", JSON.stringify(userAtualizado));
            }
        }
    };

    return (
        <>
            {currentPage === 'login' && <SignIn onNavigate={handleNavigation} />}
            {currentPage === 'signup' && <SignUp onNavigate={handleNavigation} />}
            {currentPage === 'crud' && usuario?.is_admin === 1 && (
                <Crud
                    onNavigate={handleNavigation}
                    usuario={usuario}
                    setUsuario={setUsuario}
                />
            )}
            {currentPage === 'crudNews' && usuario?.is_admin === 1 && <CrudNews onNavigate={handleNavigation}/>}
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
                    onUsuarioAtualizado={handleUsuarioAtualizado}
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