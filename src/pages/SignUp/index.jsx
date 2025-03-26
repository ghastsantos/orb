import React, { useState } from 'react';
import { Container, Form, Background, Logo } from './styles';
import { Input } from '../../components/Input';
import { FiMail, FiLock, FiUser, FiBook, FiClock, FiCalendar } from 'react-icons/fi';
import { Button } from '../../components/Button';
import logoImg from '../../assets/logo.png';

export function SignUp({ onNavigate }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        course: '',
        period: '',
        birthdate: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
    
        if (!formData.name.trim()) {
            newErrors.name = 'O nome é obrigatório.';
        } else if (!/^[a-zA-Z\s]{3,}$/.test(formData.name)) {
            newErrors.name = 'O nome deve ter pelo menos 3 caracteres e conter apenas letras.';
        }
    
        if (!formData.email.trim()) {
            newErrors.email = 'O e-mail é obrigatório.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Digite um e-mail válido.';
        }
    
        if (!formData.course.trim()) {
            newErrors.course = 'Escolha um curso.';
<<<<<<< Updated upstream
=======
        }else if (!/^[a-zA-Z\s]$/.test(formData.course)) {
            newErrors.course = 'O nome do curso deve conter apenas letras.';
>>>>>>> Stashed changes
        }

        if (!formData.period.trim()) {
            newErrors.period = 'Escolha um período.';
<<<<<<< Updated upstream
=======
        }else if (!/^[a-zA-Z\s]$/.test(formData.period)) {
            newErrors.period = 'O turno do curso deve conter apenas letras.';
>>>>>>> Stashed changes
        }
    
        if (!formData.birthdate.trim()) {
            newErrors.birthdate = 'Escolha uma data de nascimento.';
<<<<<<< Updated upstream
=======
        } else {
            const birthdate = new Date(formData.birthdate);
            const today = new Date();
            const age = today.getFullYear() - birthdate.getFullYear();
            const isBirthdayPassed = 
                today.getMonth() > birthdate.getMonth() || 
                (today.getMonth() === birthdate.getMonth() && today.getDate() >= birthdate.getDate());
        
            if (age < 16 || (age === 16 && !isBirthdayPassed)) {
                newErrors.birthdate = 'Você deve ter no mínimo 16 anos.';
            }
>>>>>>> Stashed changes
        }
    
        if (!formData.password.trim()) {
            newErrors.password = 'A senha é obrigatória.';
        } else if (formData.password.length < 6) {
            newErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
        }
    
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Confirme sua senha.';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem.';
        }
    
        setErrors(newErrors);
    
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Cadastro bem-sucedido:', formData);
            onNavigate('home'); 
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
                    name="name"
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
                    name="course"
                    list="courses"
                    value={formData.course}
                    onChange={handleChange}
                />
                <datalist id="courses">
                    <option value="Sistemas de Informação" />
                    <option value="Direito" />
                    <option value="Medicina" />
<<<<<<< Updated upstream
=======
                    <option value="Engenharia de Software" />
                    <option value="Odontologia" />
                    <option value="Engenharia Química" />
>>>>>>> Stashed changes
                </datalist>

                {errors.period && <span style={{ color: 'red', fontSize: '12px' }}>{errors.period}</span>}
                <Input
                    placeholder="Turno"
                    type="text"
                    icon={FiClock}
                    name="period"
                    list="turno"
                    value={formData.period}
                    onChange={handleChange}
                />
                <datalist id="turno">
                    <option value="Matutino" />
                    <option value="Vespertino" />
                    <option value="Noturno" />
                </datalist>
    
                {errors.birthdate && <span style={{ color: 'red', fontSize: '12px' }}>{errors.birthdate}</span>}
                <Input
                    placeholder="Data de nascimento"
                    type="text"
                    icon={FiCalendar}
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => (e.target.type = 'text')}
                />

                {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>}
                <Input
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                /> 

                {errors.confirmPassword && <span style={{ color: 'red', fontSize: '12px' }}>{errors.confirmPassword}</span>}
                <Input
                    placeholder="Confirme sua senha"
                    type="password"
                    icon={FiLock}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                <Button title="Cadastrar" type="submit"/>

                <a
                onClick={() => {
                    console.log('Navegando para login');
                    onNavigate('login');
                }}
                >
                Voltar para o login
                </a>
            </Form>
        </Container>
    );
}