import { useState, useEffect } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Container, Brand, Menu, Logo, Form } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { FiHome, FiMenu, FiMessageSquare, FiSmile, FiInfo, FiBell, FiLogOut, FiUser, FiMail, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import axios from 'axios';

export function Profile({ onNavigate }){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [usuario, setUsuario ] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/session', {withCredentials: true})
        .then(res => {
            setUsuario(res.data);
        })
        .catch(err => {
            console.log("Usuário não autenticado")
        });
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                <li><ButtonText title="Home" icon={FiHome} isActive /></li>
                <li><ButtonText title="Notícias" icon={FiInfo} /></li>
                <li><ButtonText title="Eventos" icon={FiSmile} /></li>
                <li><ButtonText title="Chats" icon={FiMessageSquare} /></li>
                <li><ButtonText title="Perfil" icon={FiUser} onClick={() => onNavigate('profile')}/></li>
                <li><ButtonText title="Notificações" icon={FiBell} /></li>
                <li><ButtonText title="Crud" onClick={() => onNavigate('crud')}/></li>
                <li><ButtonText title="Sair" icon={FiLogOut} onClick={() => onNavigate('login')} /></li>
            </Menu>
            <Form>
                <div>
                    <h1>Meu perfil</h1>
                <img src="https://github.com/ghastsantos.png" alt="foto do usuário"/>
                <Input
                    placeholder="Nome" 
                    type="text"
                    icon={FiUser}
                />
                <Input
                    placeholder="E-mail" 
                    type="email"
                    icon={FiMail}
                />
                <Input
                    placeholder="Senha atual" 
                    type="password"
                    icon={FiLock}
                />
                <Input
                    placeholder="Nova senha" 
                    type="password"
                    icon={FiLock}
                />

                <Button title="Salvar" />
                </div>
            </Form>
        </Container>

    );
}