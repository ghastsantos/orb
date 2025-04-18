import React, { useState } from 'react';
import { Container, Form, Background, Logo } from './styles';
import { Input } from '../../components/Input';
import { FiMail, FiLock} from 'react-icons/fi';
import { Button } from '../../components/Button';
import logoImg from '../../assets/logo.png';
import axios from 'axios';

export function SignIn({ onNavigate }) {
    const [formData, setFormData] = useState({
        email: '',
        senha: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'O e-mail é obrigatório.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Digite um e-mail válido.';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'A senha é obrigatória.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/login', formData)
            console.log("Login realizado com sucesso!")
            onNavigate('home')
        } catch (error) {
            console.log(error)
            
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Logo>
                    <img src={logoImg} alt="Logo" />
                </Logo>
                <p>A universidade, na palma da sua mão.</p>

                <h2>Faça seu login</h2>

                {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>}
                <Input
                    placeholder="Senha"
                    type="text"
                    icon={FiLock}
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                />

                <Button title="Entrar" type="submit" />

                <a href="#" onClick={() => onNavigate('signup')}>
                    Criar conta
                </a>
            </Form>

            <Background />
        </Container>
    );
}