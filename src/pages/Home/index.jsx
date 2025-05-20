import { useState, useEffect } from 'react';
import { Container, Brand, Menu, Content, Logo } from './styles';
import { Header } from '../../components/Header';
import { ButtonText } from '../../Components/ButtonText';
import { FiHome, FiMenu, FiMessageSquare, FiUser, FiSmile, FiInfo, FiBell, FiLogOut } from 'react-icons/fi';
import { Section } from '../../Components/Section';
import { News } from '../../Components/News';
import logoImg from '../../assets/logo.png';
import reactImage from '../../assets/pucpr2.jpg';
import { UsersCarousel } from '../../Components/UsersCarousel';
import axios from 'axios';

export function Home({ onNavigate }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [usuario, setUsuario ] = useState(null);

    const [usuariosCarousel, setUsuariosCarousel] = useState([]);

    useEffect(() => {
    // Verifica sessão
    axios.get('http://localhost:3000/api/session', { withCredentials: true })
        .then(res => setUsuario(res.data))
        .catch(err => console.log("Usuário não autenticado"));

    // Busca usuários para o carrossel
    axios.get('http://localhost:3000/api/usuario', { withCredentials: true })
        .then(res => setUsuariosCarousel(res.data))
        .catch(err => console.error('Erro ao carregar usuários:', err));
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Container className={isMenuOpen ? 'menu-open' : 'menu-closed'}>
            <Brand>
                <FiMenu size={32} onClick={toggleMenu} />
                <Logo>
                    <img src={logoImg} alt="Logo" />
                </Logo>
            </Brand>
            <Header usuario={usuario} onNavigate={onNavigate} className={isMenuOpen ? 'menu-open' : 'menu-closed'} />
            <Menu className={isMenuOpen ? 'menu-open' : 'menu-closed'}>
                <li><ButtonText title="Home" icon={FiHome} isActive /></li>
                <li><ButtonText title="Notícias" icon={FiInfo} /></li>
                <li><ButtonText title="Eventos" icon={FiSmile} /></li>
                <li><ButtonText title="Chats" icon={FiMessageSquare} /></li>
                <li><ButtonText title="Perfil" icon={FiUser} onClick={() => onNavigate('profile')}/></li>
                <li><ButtonText title="Notificações" icon={FiBell} /></li>
                <li><ButtonText title="Crud" onClick={() => onNavigate('crud')}/></li>
                <li><ButtonText title="Sair" icon={FiLogOut} onClick={() => onNavigate('login')} /></li>
            </Menu>
            <Content className={isMenuOpen ? 'menu-open' : 'menu-closed'}>
                <Section title="Destaques da semana">
                    <News
                        data={[
                            {
                                id: '1',
                                title: 'Teste',
                                image: reactImage,
                                tags: [
                                    { id: '1', name: 'eventos' },
                                    { id: '2', name: 'pucpr' },
                                ],
                            },
                            {
                                id: '2',
                                title: 'Teste 2',
                                image: reactImage,
                                tags: [
                                    { id: '3', name: 'tecnologia' },
                                    { id: '4', name: 'estudantes' },
                                    { id: '2', name: 'pucpr' },
                                ],
                            },
                            {
                                id: '3',
                                title: 'Teste 3',
                                image: reactImage,
                                tags: [
                                    { id: '5', name: 'sistemas de informação' },
                                    { id: '2', name: 'pucpr' },
                                ],
                            },
                        ]}
                    />
                </Section>
                <Section title="Conecte-se com outros estudantes!">
                    <UsersCarousel
                    data={usuariosCarousel.map(user => ({
                        id: user.id,
                        name: user.nome,
                        image: `http://localhost:3000/api/usuario/imagem/${user.id}`,
                        text: user.descricao || "", // Se quiser uma descrição
                        tags: user.tags, // Assumindo que virão as tags
                    }))}
                            />
                    </Section>
            </Content>
        </Container>
    );
}