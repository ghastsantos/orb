import React, { useState } from 'react';
import { Container, Form, Background, Logo } from './styles';
import { Input } from '../../components/Input';
import { FiMail, FiLock, FiUser, FiBook, FiClock, FiCalendar } from 'react-icons/fi';
import { Button } from '../../components/Button';
import logoImg from '../../assets/logo.png';
import axios from 'axios';

export function SignUp({ onNavigate }) {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        curso_id: '',
        turno_id: '',
        data_nasc: '',
        senha: '',
        confirmasenha: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    

    const validateForm = () => {
        const newErrors = {};
    
        if (!formData.nome.trim()) {
            newErrors.name = 'O nome é obrigatório.';
        } else if (!/^[\p{L}\s]{3,}$/u.test(formData.name)) {
            newErrors.name = 'O nome deve ter pelo menos 3 caracteres e conter apenas letras.';
        }
    
        if (!formData.email.trim()) {
            newErrors.email = 'O e-mail é obrigatório.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Digite um e-mail válido.';
        }
    
        if (!formData.curso_id.trim()) {
            newErrors.course = 'Escolha um curso.';
        } else if (!/^[\p{L}\s]{3,}$/u.test(formData.course)) {
            newErrors.course = 'O nome do curso deve conter apenas letras e ter pelo menos 3 caracteres.';
        }
        
        if (!formData.turno_id.trim()) {
            newErrors.turno = 'Escolha um período.';
        } else if (!/^[\p{L}\s]{3,}$/u.test(formData.turno)) {
            newErrors.turno_id = 'O turno do curso deve conter apenas letras e ter pelo menos 3 caracteres.';
        }
    
        if (!formData.data_nasc.trim()) {
            newErrors.birthdate = 'Escolha uma data de nascimento.';
        } else {
            const [day, month, year] = formData.data_nasc.split('/');
            const birthdate = new Date(`${year}-${month}-${day}`);
            const today = new Date();
            const age = today.getFullYear() - birthdate.getFullYear();
            const isBirthdayPassed =
                today.getMonth() > birthdate.getMonth() ||
                (today.getMonth() === birthdate.getMonth() && today.getDate() >= birthdate.getDate());
        
            if (age < 16 || (age === 16 && !isBirthdayPassed)) {
                newErrors.birthdate = 'Você deve ter no mínimo 16 anos.';
            }
        }
    
        if (!formData.senha.trim()) {
            newErrors.password = 'A senha é obrigatória.';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/.test(formData.senha)) {
            newErrors.password = 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.';
            
        }
    
        if (!formData.confirmasenha.trim()) {
            newErrors.confirmPassword = 'Confirme sua senha.';
        } else if (formData.senha !== formData.confirmasenha) {
            newErrors.confirmPassword = 'As senhas não coincidem.';
        }
    
        setErrors(newErrors);
    
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            return;
        }
       try {
        await axios.post('http://localhost:3000/api/usuario', formData)
        console.log('Usuário cadastrado com sucesso!');
        onNavigate('login');
       } catch (error) {
        console.log (error);
       }
    };

    return (
        <Container>
            <Background />

            <Form onSubmit={handleSubmit}>
                <Logo>
                    <img src={logoImg} alt="Logo" />
                </Logo>
                <p>A universidade, na palma da sua mão.</p>

                <h2>Crie sua conta</h2>

                {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>}
                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    name="nome"
                    value={formData.name}
                    onChange={handleChange}
                />

                {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            
                {errors.course && <span style={{ color: 'red', fontSize: '12px' }}>{errors.course}</span>}
                <Input
                    placeholder="Escolha seu curso"
                    type="text"
                    icon={FiBook}
                    name="curso_id"
                    list="courses"
                    value={formData.curso_id}
                    onChange={handleChange}
                />
                <datalist id="courses">
                    <option value="1">Sistemas de Informação</option>
                    <option value="2">Direito</option>
                    <option value="3">Medicina</option>
                    <option value="4">Engenharia de Software</option>
                    <option value="5">Odontologia</option>
                    <option value="6">Engenharia Química</option>
                </datalist>

                {errors.turno && <span style={{ color: 'red', fontSize: '12px' }}>{errors.turno}</span>}
                <Input
                    placeholder="Turno"
                    type="text"
                    icon={FiClock}
                    name="turno_id"
                    list="turno"
                    value={formData.turno_id}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <datalist id="turno">
                    <option value="1">Matutino</option>
                    <option value="2">Vespertino</option>
                    <option value="3">Noturno</option>
                </datalist>
    
                {errors.birthdate && <span style={{ color: 'red', fontSize: '12px' }}>{errors.birthdate}</span>}
                <Input
                    placeholder="Data de nascimento"
                    type="date"
                    icon={FiCalendar}
                    name="data_nasc"
                    value={formData.data_nasc}
                    onChange={handleChange}
                />

                {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>}
                <Input
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                /> 

                {errors.confirmPassword && <span style={{ color: 'red', fontSize: '12px' }}>{errors.confirmPassword}</span>}
                <Input
                    placeholder="Confirme sua senha"
                    type="password"
                    icon={FiLock}
                    name="confirmasenha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                <Button title="Cadastrar" type="submit"/>

                <a
                onClick={() => {
                    handleSubmit();
                    onNavigate('login');
                }}
                >
                Voltar para o login
                </a>
            </Form>
        </Container>
    );
}