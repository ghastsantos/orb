import { useState } from 'react';
import { Container, Brand, Menu, Search, Content, NewNote, Logo } from './styles';
import { Header } from '../../Components/Header';
import { ButtonText } from '../../Components/ButtonText';
import { FiPlus, FiSearch, FiMenu } from 'react-icons/fi';
import { Input } from '../../Components/Input';
import { Section } from '../../Components/Section';
import { Note } from '../../Components/Note';
import logoImg from '../../assets/logo.png';

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
            {isMenuOpen && (
                <Menu>
                    <li><ButtonText title="Todos" isActive /></li>
                    <li><ButtonText title="React" /></li>
                    <li><ButtonText title="Nodejs" /></li>
                </Menu>
            )}
            <Search>
                <Input placeholder="Pesquisar pelo título" icon={FiSearch} />
            </Search>
            <Content>
                <Section title="Minhas notas">
                    <Note data={{
                        title: 'React',
                        tags: [
                            { id: '1', name: 'react' },
                            { id: '2', name: 'nodejs' }
                        ]
                    }}
                    />
                </Section>
            </Content>
        </Container>
    );
}