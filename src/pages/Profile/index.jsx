import { useState, useEffect, useRef } from 'react';
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
const [selectedImage, setSelectedImage] = useState(null);
const fileInputRef = useRef(null);

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
    setIsLoading(true);
    setError('');
    try {
        const dataToUpdate = {};
        if (nome !== usuario?.nome) {
            dataToUpdate.nome = nome;
        }
        if (email !== usuario?.email) {
            dataToUpdate.email = email;
        }
        if (novaSenha) {
            dataToUpdate.senha = novaSenha; // Envie a nova senha (a API deve lidar com a criptografia)
        }

        if (Object.keys(dataToUpdate).length > 0) {
            await axios.put(`http://localhost:3000/api/usuarioperfil/${usuario.id}`, dataToUpdate, {
                withCredentials: true,
            });
            // Atualize o estado do usuário com os novos dados
            setUsuario({...usuario, ...dataToUpdate});
            alert('Perfil atualizado com sucesso!'); // Dê um feedback ao usuário
        } else {
            alert('Nenhuma alteração foi feita.');
        }
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        setError('Erro ao atualizar o perfil. Tente novamente.');
    } finally {
        setIsLoading(false);
    }
};

const handleImageChange = (event) => {
    if (event.target.files && event.target.files?.[0]) { // Use optional chaining aqui também
        const imageFile = event.target.files?.[0];
        setSelectedImage(imageFile);
        if (usuario?.id) {
            handleImageUpload(imageFile); // Chama a função de upload automaticamente SE o usuário estiver carregado
        } else {
            console.warn("Dados do usuário ainda não carregados. O upload da imagem será adiado.");
            // Opcional: Você pode adicionar alguma lógica para tentar o upload novamente após um tempo
        }
    }
};

const handleImageUpload = async (file) => {
    if (!file || !usuario?.id) {
        console.warn("Não é possível fazer o upload da imagem: arquivo ou ID do usuário ausente.");
        return;
    }

    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('imagem', file);

    try {
        await axios.post(`http://localhost:3000/api/usuario/imagem/${usuario.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        // Após o upload bem-sucedido, recarregue os dados do usuário para exibir a nova imagem
        axios.get('http://localhost:3000/api/session', { withCredentials: true })
            .then(res => {
                setUsuario(res.data);
                alert('Foto de perfil atualizada com sucesso!');
            })
            .catch(err => {
                console.error("Erro ao recarregar dados do usuário:", err);
            });
    } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
        setError('Erro ao atualizar a foto de perfil. Tente novamente.');
    } finally {
        setIsLoading(false);
        setSelectedImage(null); // Limpe a imagem selecionada após o upload
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reseta o valor do input
        }
    }
};

const handleClickFotoPerfil = () => {
    fileInputRef.current.click(); // Aciona o clique no input file escondido
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
                src={usuario?.id ? `http://localhost:3000/api/usuario/imagem/${usuario.id}` : ''}
                alt="Foto do usuário"
                style={{ cursor: 'pointer' }} // Indica que a imagem é clicável
                onClick={handleClickFotoPerfil}
             />
             <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }} // Esconde o input file
                onChange={handleImageChange} // O upload automático é chamado aqui
                accept="image/*" // Aceita apenas arquivos de imagem
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
            <Button title={isLoading ? "Salvando..." : "Salvar"} onClick={handleSalvarPerfil} disabled={isLoading} />
        </Form>
    </Container>

);
}