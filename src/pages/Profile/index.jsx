import { useState, useEffect } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Container, Brand, Menu, Logo, Form } from './styles';
import { ButtonText } from '../../Components/ButtonText';
import { FiHome, FiCamera, FiMenu, FiX, FiMessageSquare, FiSmile, FiInfo, FiBell, FiLogOut, FiUser, FiMail, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import axios from 'axios';

export function Profile({ onNavigate, usuario, imgVersion, onFotoAtualizada }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [nome, setNome] = useState(usuario?.nome || '');
    const [email, setEmail] = useState(usuario?.email || '');
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [imagem, setImagem] = useState(null);
    const [preview, setPreview] = useState('');
    const [removerFoto, setRemoverFoto] = useState(false);

    useEffect(() => {
        setNome(usuario?.nome || '');
        setEmail(usuario?.email || '');
    }, [usuario]);

    useEffect(() => {
        if (imagem) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(imagem);
        } else {
            setPreview('');
        }
    }, [imagem]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSalvarPerfil = async () => {
        setIsLoading(true);
        setError('');
        try {
            if (removerFoto && usuario?.id) {
                await axios.delete(`http://localhost:3000/api/usuario/imagem/${usuario.id}`, { withCredentials: true });
                if (onFotoAtualizada) onFotoAtualizada();
            }

            const formData = new FormData();
            if (nome !== usuario?.nome) formData.append('nome', nome);
            if (email !== usuario?.email) formData.append('email', email);
            if (novaSenha) formData.append('senha', novaSenha);
            if (imagem) formData.append('imagem', imagem);

            if ([...formData.keys()].length > 0) {
                await axios.put(
                    `http://localhost:3000/api/usuarioperfil/${usuario.id}`,
                    formData,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                if (imagem && onFotoAtualizada) onFotoAtualizada();
            }
            setImagem(null);
            setRemoverFoto(false);
        } catch (err) {
            setError('Erro ao salvar perfil.');
        }
        setIsLoading(false);
    };

    const handleRemoverFoto = () => {
        setImagem(null);
        setPreview('');
        setRemoverFoto(true);
    };

    const handleImagemChange = (e) => {
        const file = e.target.files[0];
        setImagem(file);
        setRemoverFoto(false);
    };

    const fotoPerfilSrc = preview
        ? preview
        : removerFoto
            ? ''
            : (usuario?.id ? `http://localhost:3000/api/usuario/imagem/${usuario.id}?t=${imgVersion}` : '');

    return (
        <Container>
            <Brand>
                <FiMenu size={32} onClick={toggleMenu} />
                <Logo>
                    <img src={logoImg} alt="Logo" />
                </Logo>
            </Brand>
            <Menu className={isMenuOpen ? 'menu-open' : 'menu-closed'}>
                <li><ButtonText title="Home" icon={FiHome} onClick={() => onNavigate('home')} /></li>
                <li><ButtonText title="Notícias" icon={FiInfo} /></li>
                <li><ButtonText title="Eventos" icon={FiSmile} /></li>
                <li><ButtonText title="Chats" icon={FiMessageSquare} /></li>
                <li><ButtonText title="Perfil" icon={FiUser} isActive onClick={() => onNavigate('profile')} /></li>
                <li><ButtonText title="Notificações" icon={FiBell} /></li>
                <li><ButtonText title="Crud" onClick={() => onNavigate('crud')} /></li>
                <li><ButtonText title="Sair" icon={FiLogOut} onClick={() => onNavigate('login')} /></li>
            </Menu>
            <Form>
                <h1>Meu perfil</h1>
                <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 24px', background: 'transparent' }}>
                    <img
                        src={fotoPerfilSrc}
                        alt="Foto do usuário"
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '3px solid #ccc',
                            display: 'block'
                        }}
                        onError={e => { e.target.src = ''; }}
                    />
                    <button
                        type="button"
                        onClick={handleRemoverFoto}
                        style={{
                            position: 'absolute',
                            top: 12,
                            right: -6,
                            background: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            cursor: 'pointer',
                            zIndex: 2
                        }}
                        title="Remover foto"
                    >
                        <FiX size={18} color="#c00" />
                    </button>
                    <label
                        htmlFor="input-foto"
                        style={{
                            position: 'absolute',
                            top: 15,
                            left: 15,
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            cursor: 'pointer',
                            background: 'rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end'
                        }}
                        title="Alterar foto de perfil"
                    >
                        <span
                            style={{
                                background: '#fff',
                                borderRadius: '50%',
                                padding: 8,
                                margin: 8,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <FiCamera size={20} color="#333" />
                        </span>
                        <input
                            id="input-foto"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImagemChange}
                        />
                    </label>
                </div>
                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <Input
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                    value={senhaAtual}
                    onChange={(e) => setSenhaAtual(e.target.value)}
                />
                <Input
                    placeholder="Nova senha"
                    type="password"
                    icon={FiLock}
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                />

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <Button title={isLoading ? "Salvando..." : "Salvar"} onClick={handleSalvarPerfil} disabled={isLoading} />
            </Form>
        </Container>
    );
}