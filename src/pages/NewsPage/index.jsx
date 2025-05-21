import { useState, useEffect } from 'react';
import { Container, Brand, Menu, Logo, Content, NewsCard, NewsGrid, FilterBar } from './styles';
import { Header } from '../../components/Header';
import { ButtonText } from '../../Components/ButtonText';
import { FiHome, FiMenu, FiMessageSquare, FiSearch, FiUser, FiSmile, FiInfo, FiBell, FiLogOut } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import axios from 'axios';

export function NewsPage({ onNavigate, usuario, imgVersion }) {
    const [noticias, setNoticias] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [ordem, setOrdem] = useState("desc"); // "desc" = mais novas, "asc" = mais antigas

    useEffect(() => {
        axios.get("http://localhost:3000/api/noticias")
            .then(res => setNoticias(res.data))
            .catch(() => setNoticias([]));
    }, []);

    const noticiasFiltradas = [...noticias]
        .sort((a, b) =>
            ordem === "desc"
                ? new Date(b.data_publicacao) - new Date(a.data_publicacao)
                : new Date(a.data_publicacao) - new Date(b.data_publicacao)
        );

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Container>
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
                            <li><ButtonText title="Home" icon={FiHome} onClick={() => onNavigate('home')}/></li>
                            <li><ButtonText title="Notícias" icon={FiInfo} onClick={() => onNavigate('newsPage')} isActive/></li>
                            <li><ButtonText title="Eventos" icon={FiSmile} /></li>
                            <li><ButtonText title="Chats" icon={FiMessageSquare} /></li>
                            <li><ButtonText title="Perfil" icon={FiUser} onClick={() => onNavigate('profile')} /></li>
                            <li><ButtonText title="Notificações" icon={FiBell} /></li>
                            <li><ButtonText title="Crud" onClick={() => onNavigate('crud')} /></li>
                            <li><ButtonText title="Crud de Notícias" onClick={() => onNavigate('crudNews')} /></li>
                            <li><ButtonText title="Sair" icon={FiLogOut} onClick={() => onNavigate('login')} /></li>
                        </Menu>
            <Content>
                <h1>Notícias</h1>
                <FilterBar>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <select
                            value={ordem}
                            onChange={e => setOrdem(e.target.value)}
                            style={{ padding: 6, borderRadius: 4, marginBottom: 0, border: "1px solid #ccc" }}
                        >
                            <option value="desc">Mais novas</option>
                            <option value="asc">Mais antigas</option>
                        </select>
                        <div style={{ position: "relative" }}>
                            <input
                                type="text"
                                placeholder="Pesquisar notícia..."
                                value={pesquisa}
                                onChange={e => setPesquisa(e.target.value)}
                                style={{ padding: "6px 30px 6px 8px", borderRadius: 4, border: "1px solid #ccc" }}
                            />
                            <FiSearch style={{ position: "absolute", right: 8, top: 8, color: "#888" }} />
                        </div>
                    </div>
                </FilterBar>
                <NewsGrid>
                    {noticiasFiltradas.length === 0 && (
                        <p style={{ gridColumn: "1/-1", textAlign: "center" }}>Nenhuma notícia encontrada.</p>
                    )}
                    {noticiasFiltradas.map(n => (
                        <NewsCard key={n.id}>
                            <img
                                src={n.temImagem
                                    ? `http://localhost:3000/api/noticias/imagem/${n.id}`
                                    : "https://via.placeholder.com/300x180"}
                                alt="Notícia"
                                style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6 }}
                            />
                            <h3>{n.titulo}</h3>
                            <span style={{ fontSize: 12, color: "#888" }}>
                                {n.data_publicacao ? n.data_publicacao.split("T")[0] : ""}
                            </span>
                            <p style={{ marginTop: 8 }}>{n.conteudo.slice(0, 120)}...</p>
                        </NewsCard>
                    ))}
                </NewsGrid>
            </Content>
        </Container>
    );
}