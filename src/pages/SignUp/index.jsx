import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Background, Logo } from './styles';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { FiMail, FiLock, FiUser, FiBook, FiClock, FiCalendar } from 'react-icons/fi';
import { Button } from '../../components/Button';
import logoImg from '../../assets/logo.png';

function formatDate(value) {
    const numericValue = value.replace(/\D/g, '');
  
    if (numericValue.length <= 2) {
      return numericValue;
    } else if (numericValue.length <= 4) {
      return `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
    } else {
      return `${numericValue.slice(0, 2)}/${numericValue.slice(2, 4)}/${numericValue.slice(4, 8)}`;
    }
  }

  const formatDateForDatabase = (date) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
};

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

        if (name === 'dataNasc') {
            setFormData({ ...formData, [name]: formatDate(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        const newErrors = {};
    
        if (!/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(formData.nome.trim())) {
            newErrors.name = 'O nome deve ter pelo menos 2 caracteres e não pode conter números.';
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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
            const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    
            if (!dateRegex.test(formData.dataNasc)) {
                newErrors.birthdate = 'Data de nascimento inválida. Use o formato dd/mm/aaaa.';
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
        if (!validateForm()) {
            return;
        }
    
        const formattedData = {
            ...formData,
            dataNasc: formatDateForDatabase(formData.dataNasc),
        };
    
        try {
            await axios.post('http://localhost:3000/api/usuario', formattedData);
            console.log('Usuário cadastrado com sucesso!');
            onNavigate('login');
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
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
                <Select
                    name="curso_id"
                    value={formData.curso_id}
                    onChange={handleChange}
                    icon={FiBook}
                    options={cursos}
                    placeholder="Curso"
                />

                {errors.turno && <span style={{ color: 'red', fontSize: '12px' }}>{errors.turno}</span>}
                <Select
                    name="turno_id"
                    value={formData.turno_id}
                    onChange={handleChange}
                    icon={FiClock}
                    options={turnos}
                    placeholder="Turno"
                />

                {errors.birthdate && <span style={{ color: 'red', fontSize: '12px' }}>{errors.birthdate}</span>}
                <Input
                    placeholder="Data de nascimento"
                    type="text"
                    icon={FiCalendar}
                    name="dataNasc"
                    value={formData.dataNasc}
                    onChange={handleChange}
                    maxLenght={10}
                    autoComplete="new-password"
                />


                {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>}
                <Input
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    onCopy={(e) => e.preventDefault()} // Impede copiar
                    onCut={(e) => e.preventDefault()}  // Impede recortar
                    onPaste={(e) => e.preventDefault()} // Impede colar
                />

                {errors.confirmPassword && <span style={{ color: 'red', fontSize: '12px' }}>{errors.confirmPassword}</span>}
                <Input
                    placeholder="Confirme sua senha"
                    type="password"
                    icon={FiLock}
                    name="confirmasenha"
                    value={formData.confirmasenha}
                    onChange={handleChange}
                    onCopy={(e) => e.preventDefault()} // Impede copiar
                    onCut={(e) => e.preventDefault()}  // Impede recortar
                    onPaste={(e) => e.preventDefault()} // Impede colar
                />

                <Button title="Cadastrar" type="submit" />

                <a onClick={() => onNavigate('login')}>
                    Voltar para o login
                </a>
            </Form>
        </Container>
    );
}
