import { useState } from 'react';
import { Container, Brand, Menu, Content, Logo } from './styles';
import { Header } from '../../Components/Header';
import { ButtonText } from '../../Components/ButtonText';
import { FiHome, FiMenu, FiMessageSquare, FiUser, FiSmile, FiInfo, FiBell, FiLogOut } from 'react-icons/fi';
import { Section } from '../../Components/Section';
import { News } from '../../Components/News';
import logoImg from '../../assets/logo.png';
import reactImage from '../../assets/logo.png';

export function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Header />
            <Menu className={isMenuOpen ? 'menu-open' : 'menu-closed'}>
                <li><ButtonText title="Home" icon={FiHome} isActive /></li>
                <li><ButtonText title="Notícias"icon={FiInfo} /></li>
                <li><ButtonText title="Eventos" icon={FiSmile} /></li>  
                <li><ButtonText title="Chats" icon={FiMessageSquare} /></li>
                <li><ButtonText title="Perfil" icon={FiUser}/></li>
                <li><ButtonText title="Notificações" icon={FiBell}/></li> 
                <li><ButtonText title="Sair" icon={FiLogOut}/></li>
            </Menu>
            <Content>
                <Section title="Destaques">
                <News
                    data={[
                        {
                            id: '1',
                            title: 'React',
                            image: reactImage,
                            tags: [
                                { id: '1', name: 'react' },
                                { id: '2', name: 'javascript' },
                            ],
                        },
                        {
                            id: '2',
                            title: 'Node.js',
                            image: reactImage,
                            tags: [
                                { id: '1', name: 'nodejs' },
                                { id: '2', name: 'backend' },
                            ],
                        },
                        {
                            id: '3',
                            title: 'CSS Tricks',
                            image: reactImage,
                            tags: [
                                { id: '1', name: 'css' },
                                { id: '2', name: 'design' },
                            ],
                        },
                    ]}
                />
                </Section>
            </Content>
        </Container>
    );
}