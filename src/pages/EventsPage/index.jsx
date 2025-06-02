import { useState, useEffect } from 'react';
import { Container, Brand, Menu, Logo, Content, FilterRow, NewsCard, NewsGrid, FilterBar } from '../NewsPage/styles';
import { Header } from '../../components/Header';
import { ButtonText } from '../../Components/ButtonText';
import { FiHome, FiMenu, FiMessageSquare, FiSearch, FiUser, FiSmile, FiInfo, FiBell, FiLogOut } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import { Modal } from '../../components/Modal';
import axios from 'axios';

export function EventsPage({ onNavigate, usuario, imgVersion }) {
    const [eventos, setEventos] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [ordem, setOrdem] = useState("desc");
    const [modalOpen, setModalOpen] = useState(false);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/api/eventos")
            .then(res => setEventos(res.data))
            .catch(() => setEventos([]));
    }, []);

    const eventosFiltrados = [...eventos]
        .filter(e =>
            e.titulo.toLowerCase().includes(pesquisa.toLowerCase()) ||
            (e.descricao && e.descricao.toLowerCase().includes(pesquisa.toLowerCase()))
        )
        .sort((a, b) =>
            ordem === "desc"
                ? new Date(b.data_hora) - new Date(a.data_hora)
                : new Date(a.data_hora) - new Date(b.data_hora)
        );

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    function formatarDataHoraBR(dataISO) {
        if (!dataISO) return "";
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const hora = String(data.getHours()).padStart(2, '0');
        const min = String(data.getMinutes()).padStart(2, '0');
        return `${dia}/${mes}/${ano} ${hora}:${min}`;
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
                <li><ButtonText title="Notícias" icon={FiInfo} onClick={() => onNavigate('newsPage')} /></li>
                <li><ButtonText title="Eventos" icon={FiSmile} isActive/></li>
                <li><ButtonText title="Chats" icon={FiMessageSquare} /></li>
                <li><ButtonText title="Perfil" icon={FiUser} onClick={() => onNavigate('profile')} /></li>
                <li><ButtonText title="Notificações" icon={FiBell} /></li>
                {usuario?.is_admin === 1 && (
                    <>
                        <li><ButtonText title="Crud de Usuários" onClick={() => onNavigate('crud')} /></li>
                        <li><ButtonText title="Crud de Notícias" onClick={() => onNavigate('crudNews')} /></li>
                        <li><ButtonText title="Crud de Eventos" onClick={() => onNavigate('crudEvents')} /></li>
                    </>
                )}
                <li><ButtonText title="Sair" icon={FiLogOut} onClick={() => onNavigate('login')} /></li>
            </Menu>
            <Content className={isMenuOpen ? 'menu-open' : 'menu-closed'}>
                <h1>Eventos</h1>
                <FilterBar>
                    <FilterRow>
                        <div style={{ position: "relative" }}>
                            <input
                                type="text"
                                placeholder="Pesquisar evento..."
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
                            <option value="desc">Mais recentes</option>
                            <option value="asc">Mais antigos</option>
                        </select>
                    </FilterRow>
                </FilterBar>
                <NewsGrid>
                    {eventosFiltrados.length === 0 && (
                        <p style={{ gridColumn: "1/-1", textAlign: "center" }}>Nenhum evento encontrado.</p>
                    )}
                    {eventosFiltrados.map(ev => (
                        <NewsCard key={ev.id} onClick={() => { setEventoSelecionado(ev); setModalOpen(true); }} style={{ cursor: 'pointer'}}>
                            <img
                                src={ev.temImagem
                                    ? `http://localhost:3000/api/eventos/imagem/${ev.id}`
                                    : "https://via.placeholder.com/300x180"}
                                alt="Evento"
                                style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6 }}
                            />
                            <h3 style={{ color: "black" }}>{ev.titulo}</h3>
                            <span style={{ fontSize: 12, color: "black" }}>
                                {formatarDataHoraBR(ev.data_hora)}
                            </span>
                        </NewsCard>
                    ))}
                </NewsGrid>
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                    {eventoSelecionado && (
                        <>
                            <h2 style={{ color: "white" }}>{eventoSelecionado.titulo}</h2>
                            <span style={{ fontSize: 12, color: "#ccc" }}>
                                {formatarDataHoraBR(eventoSelecionado.data_hora)}
                            </span>
                            <div style={{ margin: "16px 0" }}>
                                {eventoSelecionado.temImagem && (
                                    <img
                                        src={`http://localhost:3000/api/eventos/imagem/${eventoSelecionado.id}`}
                                        alt="Evento"
                                        style={{ width: "100%", objectFit: "cover", borderRadius: 6 }}
                                    />
                                )}
                            </div>
                            <p style={{ color: "#fff", whiteSpace: "pre-line" }}>{eventoSelecionado.descricao}</p>
                            <p style={{ color: "#fff" }}><b>Local:</b> {eventoSelecionado.localizacao}</p>
                            {eventoSelecionado.link_externo && (
                                <a
                                    href={eventoSelecionado.link_externo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "inline-block",
                                        marginTop: 12,
                                        color: "#FFA500",
                                        background: "#222",
                                        padding: "8px 16px",
                                        borderRadius: 6,
                                        textDecoration: "none",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Participar
                                </a>
                            )}
                        </>
                    )}
                </Modal>
            </Content>
        </Container>
    );
}