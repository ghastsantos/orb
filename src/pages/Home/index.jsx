import { useState, useEffect } from 'react';
import { Container, Brand, Menu, Content, Logo } from './styles';
import { Header } from '../../components/Header';
import { ButtonText } from '../../Components/ButtonText';
import { FiHome, FiMenu, FiMessageSquare, FiUser, FiSmile, FiInfo, FiBell, FiLogOut } from 'react-icons/fi';
import { Section } from '../../Components/Section';
import { News } from '../../Components/News';
import logoImg from '../../assets/logo.png';
import { UsersCarousel } from '../../Components/UsersCarousel';
import axios from 'axios';
import defaultAvatar from '../../assets/fotoperfil.png';

export function Home({ onNavigate, usuario, imgVersion }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [usuariosCarousel, setUsuariosCarousel] = useState([]);
    const [noticias, setNoticias] = useState([]);
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/noticias')
            .then(res => setNoticias(res.data));
        axios.get('http://localhost:3000/api/eventos')
            .then(res => setEventos(res.data));
    }, []);

    useEffect(() => {
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

            <Header
                usuario={usuario}
                imgVersion={imgVersion}
                onNavigate={onNavigate}
                className={isMenuOpen ? 'menu-open' : 'menu-closed'}
            />

            <Menu className={isMenuOpen ? 'menu-open' : 'menu-closed'}>
                <li><ButtonText title="Home" icon={FiHome} isActive /></li>
                <li><ButtonText title="Notícias" icon={FiInfo} onClick={() => onNavigate('newsPage')} /></li>
                <li><ButtonText title="Eventos" icon={FiSmile} onClick={() => onNavigate('eventsPage')} /></li>
                <li><ButtonText title="Chats" icon={FiMessageSquare} /></li>
                <li><ButtonText title="Perfil" icon={FiUser} onClick={() => onNavigate('profile')} /></li>
                <li><ButtonText title="Notificações" icon={FiBell} /></li>
                {usuario?.is_admin === 1 &&  (
                    <>
                        <li><ButtonText title="Crud de Usuários" onClick={() => onNavigate('crud')} /></li>
                        <li><ButtonText title="Crud de Notícias" onClick={() => onNavigate('crudNews')} /></li>
                        <li><ButtonText title="Crud de Eventos" onClick={() => onNavigate('crudEvents')} /></li>
                    </>
                )}
                <li><ButtonText title="Sair" icon={FiLogOut} onClick={() => onNavigate('login')} /></li>
            </Menu>

            <Content className={isMenuOpen ? 'menu-open' : 'menu-closed'}>
                <Section title="Destaques da semana">
                    <News
                        data={
                            [...noticias.map(n => ({
                                id: `noticia-${n.id}`,
                                title: n.titulo,
                                image: n.temImagem
                                    ? `http://localhost:3000/api/noticias/imagem/${n.id}`
                                    : 'https://via.placeholder.com/300x180',
                                tags: [],
                                content: n.conteudo,
                                data: n.data_publicacao
                            })),
                            ...eventos.map(ev => ({
                                id: `evento-${ev.id}`,
                                title: ev.titulo,
                                image: ev.temImagem
                                    ? `http://localhost:3000/api/eventos/imagem/${ev.id}`
                                    : 'https://via.placeholder.com/300x180',
                                tags: [],
                                content: ev.descricao,
                                data: ev.data_hora,
                                localizacao: ev.localizacao,
                                link_externo: ev.link_externo
                            }))
                            ]
                            .sort((a, b) => new Date(b.data) - new Date(a.data))
                            .slice(0, 5)
                        }
                    />
                </Section>

                <Section title="Conecte-se com outros estudantes!">
                    <UsersCarousel
                        data={usuariosCarousel.map(user => ({
                            id: user.id,
                            name: user.nome,
                            image: user.id
                            ? `http://localhost:3000/api/usuario/imagem/${user.id}?t=${imgVersion}`
                            : defaultAvatar,
                            is_admin: user.is_admin,
                            curso_nome: user.curso_nome || "",
                        }))}
                    />
                </Section>
            </Content>
        </Container>
    );
}
