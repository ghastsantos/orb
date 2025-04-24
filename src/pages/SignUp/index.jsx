import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Background, Logo } from './styles';
import { Input } from '../../components/Input';
import { FiMail, FiLock, FiUser, FiCalendar } from 'react-icons/fi';
import { Button } from '../../components/Button';
import logoImg from '../../assets/logo.png';

export function SignUp({ onNavigate }) {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        curso_id: '',
        turno_id: '',
        dataNasc: '',
        senha: '',
        confirmasenha: '',
    });

    const [cursos, setCursos] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cursosRes = await axios.get("http://localhost:3000/api/cursos");
                const turnosRes = await axios.get("http://localhost:3000/api/turnos");
                setCursos(cursosRes.data);
                setTurnos(turnosRes.data);
            } catch (error) {
                console.error("Erro ao carregar cursos/turnos:", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nome.trim()) {
            newErrors.name = 'O nome é obrigatório.';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'O e-mail é obrigatório.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Digite um e-mail válido.';
        }

        if (!formData.curso_id) {
            newErrors.course = 'Escolha um curso.';
        }

        if (!formData.turno_id) {
            newErrors.turno = 'Escolha um turno.';
        }

        if (!formData.dataNasc.trim()) {
            newErrors.birthdate = 'Escolha uma data de nascimento.';
        } else {
            const [day, month, year] = formData.dataNasc.split('/');
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
        if (!validateForm()) return;

        try {
            await axios.post('http://localhost:3000/api/usuario', formData);
            console.log('Usuário cadastrado com sucesso!');
            onNavigate('login');
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
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
                    value={formData.nome}
                    onChange={handleChange}
                />

                {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
                <Input
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                {errors.course && <span style={{ color: 'red', fontSize: '12px' }}>{errors.course}</span>}
                <select name="curso_id" value={formData.curso_id} onChange={handleChange}>
                    <option value="">Curso:</option>
                    {cursos.map((curso) => (
                        <option key={curso.id} value={curso.id}>{curso.nome}</option>
                    ))}
                </select>

                {errors.turno && <span style={{ color: 'red', fontSize: '12px' }}>{errors.turno}</span>}
                <select name="turno_id" value={formData.turno_id} onChange={handleChange}>
                    <option value="">Turno:</option>
                    {turnos.map((turno) => (
                        <option key={turno.id} value={turno.id}>{turno.nome}</option>
                    ))}
                </select>

                {errors.birthdate && <span style={{ color: 'red', fontSize: '12px' }}>{errors.birthdate}</span>}
                <Input
                    placeholder="Data de nascimento"
                    type="date"
                    icon={FiCalendar}
                    name="dataNasc"
                    value={formData.dataNasc}
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
                    value={formData.confirmasenha}
                    onChange={handleChange}
                />

                <Button title="Cadastrar" type="submit" />

                <a onClick={() => onNavigate('login')}>
                    Voltar para o login
                </a>
            </Form>
        </Container>
    );
}
