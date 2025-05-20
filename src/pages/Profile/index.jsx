import { useState, useEffect } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Container, Brand, Menu, Logo, Form } from './styles';
import { ButtonText } from '../../Components/ButtonText';
import { FiHome, FiMenu, FiMessageSquare, FiSmile, FiInfo, FiBell, FiLogOut, FiUser, FiMail, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import axios from 'axios';

export function Profile({ onNavigate }){
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [usuario, setUsuario ] = useState(null);
const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
const [senhaAtual, setSenhaAtual] = useState('');
const [novaSenha, setNovaSenha] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');
const [imagem, setImagem] = useState(null);


useEffect(() => {
    axios.get('http://localhost:3000/api/session', {withCredentials: true})
    .then(res => {
        setUsuario(res.data);
        setNome(res.data.nome || '');
        setEmail(res.data.email || '');
    })
    .catch(err => {
        console.error("Erro ao buscar dados do usuário:", err);
        // Lide com o erro de forma mais amigável para o usuário
    });
}, []);

const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
};

const handleSalvarPerfil = async () => {
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

        // Atualizar dados do estado do usuário
        setUsuario({...usuario, nome, email});
        alert('Perfil atualizado com sucesso!');
    } else {
        alert('Nenhuma alteração foi feita.');
    }
};

return(
    <Container>
        <Brand>
            <FiMenu size={32} onClick={toggleMenu} />
            <Logo>
                <img src={logoImg} alt="Logo" />
            </Logo>
        </Brand>
        <Menu className={isMenuOpen ? 'menu-open' : 'menu-closed'}>
            <li><ButtonText title="Home" icon={FiHome} onClick={() => onNavigate('home')}/></li>
            <li><ButtonText title="Notícias" icon={FiInfo} /></li>
            <li><ButtonText title="Eventos" icon={FiSmile} /></li>
            <li><ButtonText title="Chats" icon={FiMessageSquare} /></li>
            <li><ButtonText title="Perfil" icon={FiUser} isActive onClick={() => onNavigate('profile')}/></li>
            <li><ButtonText title="Notificações" icon={FiBell} /></li>
            <li><ButtonText title="Crud" onClick={() => onNavigate('crud')}/></li>
            <li><ButtonText title="Sair" icon={FiLogOut} onClick={() => onNavigate('login')} /></li>
        </Menu>
        <Form>
            <h1>Meu perfil</h1>
             <img
                src={usuario?.id ? `http://localhost:3000/api/usuario/imagem/${usuario.id}?t=${Date.now()}` : ''}
                alt="Foto do usuário"
            />
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
            <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImagem(e.target.files[0])}
             />

            <Button title={isLoading ? "Salvando..." : "Salvar"} onClick={handleSalvarPerfil} disabled={isLoading} />
        </Form>
    </Container>

);
}