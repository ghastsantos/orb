import { useState, useEffect } from 'react';
import { Container, Brand, Menu, Logo, Content, FilterRow, NewsCard, NewsGrid, FilterBar } from './styles';
import { Header } from '../../components/Header';
import { ButtonText } from '../../Components/ButtonText';
import { FiHome, FiMenu, FiMessageSquare, FiSearch, FiUser, FiSmile, FiInfo, FiBell, FiLogOut } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import { Modal } from '../../components/Modal';
import axios from 'axios';

export function NewsPage({ onNavigate, usuario, imgVersion }) {
    const [noticias, setNoticias] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [ordem, setOrdem] = useState("desc"); 
    const [modalOpen, setModalOpen] = useState(false);
    const [noticiaSelecionada, setNoticiaSelecionada] = useState(null);

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

    function formatarDataBR(dataISO) {
    if (!dataISO) return "";
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
    }


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
                            {usuario?.is_admin === 1 && (
                                <>
                                    <li><ButtonText title="Crud" onClick={() => onNavigate('crud')} /></li>
                                    <li><ButtonText title="Crud de Notícias" onClick={() => onNavigate('crudNews')} /></li>
                                </>
                            )}
                            <li><ButtonText title="Sair" icon={FiLogOut} onClick={() => onNavigate('login')} /></li>
                        </Menu>
            <Content className={isMenuOpen ? 'menu-open' : 'menu-closed'}>
                <h1>Notícias</h1>
                <FilterBar>
                    <FilterRow>
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
                        <select
                            value={ordem}
                            onChange={e => setOrdem(e.target.value)}
                            style={{ padding: 6, borderRadius: 4, marginBottom: 0, border: "1px solid #ccc" }}
                        >
                            <option value="desc">Mais novas</option>
                            <option value="asc">Mais antigas</option>
                        </select>
                    </FilterRow>
                </FilterBar>
                <NewsGrid>
                    {noticiasFiltradas.length === 0 && (
                        <p style={{ gridColumn: "1/-1", textAlign: "center" }}>Nenhuma notícia encontrada.</p>
                    )}
                    {noticiasFiltradas.map(n => (
                        <NewsCard key={n.id} onClick={() => { setNoticiaSelecionada(n); setModalOpen(true); }} style={{ cursor: 'pointer'}}>
                            <img
                                src={n.temImagem
                                    ? `http://localhost:3000/api/noticias/imagem/${n.id}`
                                    : "https://via.placeholder.com/300x180"}
                                alt="Notícia"
                                style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6 }}
                            />
                            <h3 style={{ color: "black" }}>{n.titulo}</h3>
                            <span style={{ fontSize: 12, color: "black" }}>
                                {formatarDataBR(n.data_publicacao)}
                            </span>
                        </NewsCard>
                    ))}
                </NewsGrid>
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                {noticiaSelecionada && (
                    <>
                        <h2 style={{ color: "white" }}>{noticiaSelecionada.titulo}</h2>
                        <span style={{ fontSize: 12, color: "#ccc" }}>
                            {formatarDataBR(noticiaSelecionada.data_publicacao)}
                        </span>
                        <div style={{ margin: "16px 0" }}>
                            {noticiaSelecionada.temImagem && (
                                <img
                                    src={`http://localhost:3000/api/noticias/imagem/${noticiaSelecionada.id}`}
                                    alt="Notícia"
                                    style={{ width: "100%", objectFit: "cover", borderRadius: 6 }}
                                />
                            )}
                        </div>
                        <p style={{ color: "#fff", whiteSpace: "pre-line" }}>{noticiaSelecionada.conteudo}</p>
                    </>
                )}
            </Modal>
            </Content>
        </Container>
    );
}