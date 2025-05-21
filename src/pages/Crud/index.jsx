import React from "react";
import axios from 'axios';
import { Container, Form, Table, BackButton } from './styles';
import { useState, useEffect } from 'react';

export function Crud({ onNavigate }) {
    const [dados, setDados] = useState([]);
    const [form, setForm] = useState({
        nome: "",
        email: "",
        curso_id: "",
        turno_id: "",
        dataNasc: "",
        senha: "",
        imagem: null
    });
    const [editIndex, setEditIndex] = useState(null);
    const [cursos, setCursos] = useState([]);
    const [turnos, setTurnos] = useState([]);

    useEffect(() => {
        async function fetchDados() {
            try {
                const cursosRes = await axios.get("http://localhost:3000/api/cursos");
                const turnosRes = await axios.get("http://localhost:3000/api/turnos");
                const usuariosRes = await axios.get("http://localhost:3000/api/usuario");
                setCursos(cursosRes.data);
                setTurnos(turnosRes.data);
                setDados(usuariosRes.data);
            } catch (error) {
                console.log("Erro ao buscar dados:", error);
            }
        }
        fetchDados();
    }, []);

    const formatDate = (dateStr) => {
        return dateStr ? dateStr.split("T")[0] : "";
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('nome', form.nome);
        data.append('email', form.email);
        data.append('curso_id', form.curso_id);
        data.append('turno_id', form.turno_id);
        data.append('data_nasc', form.dataNasc);
        if (form.senha) data.append('senha', form.senha);
        if (form.imagem) data.append('imagem', form.imagem);

        try {
            if (editIndex !== null) {
                const id = dados[editIndex].id;
                await axios.put(`http://localhost:3000/api/usuario/${id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post("http://localhost:3000/api/usuario", data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            // Atualize a lista após submit
            const usuariosRes = await axios.get("http://localhost:3000/api/usuario");
            setDados(usuariosRes.data);
            setForm({
                nome: "",
                email: "",
                curso_id: "",
                turno_id: "",
                dataNasc: "",
                senha: "",
                imagem: null
            });
            setEditIndex(null);
            window.location.reload();
        } catch (error) {
            console.error("Erro ao salvar usuário:", error);
        }
    };

    const handleEdit = (index) => {
        const usuario = dados[index];
        setForm({
            nome: usuario.nome,
            email: usuario.email,
            curso_id: usuario.curso_id,
            turno_id: usuario.turno_id,
            dataNasc: formatDate(usuario.data_nasc || usuario.dataNasc || ""),
            senha: "",
            imagem: null
        });
        setEditIndex(index);
    };

    const handleDelete = async (index) => {
        const id = dados[index].id;
        try {
            await axios.delete(`http://localhost:3000/api/usuario/${id}`);
            const novosDados = dados.filter((_, i) => i !== index);
            setDados(novosDados);
        } catch (error) {
            console.log("Erro ao excluir usuário:", error);
        }
    };

    return (
        <Container>
            <h1>CRUD de Usuários</h1>
            <BackButton onClick={() => onNavigate("home")}>
                Voltar para Home
            </BackButton>

            <Form onSubmit={handleSubmit}>
                <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Nome"
                    required
                />
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <select
                    name="curso_id"
                    value={form.curso_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione um curso</option>
                    {cursos.map((curso) => (
                        <option key={curso.id} value={curso.id}>
                            {curso.nome}
                        </option>
                    ))}
                </select>
                <select
                    name="turno_id"
                    value={form.turno_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione um turno</option>
                    {turnos.map((turno) => (
                        <option key={turno.id} value={turno.id}>
                            {turno.nome}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    name="dataNasc"
                    value={form.dataNasc}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="senha"
                    placeholder="Digite sua senha (ou repita caso não queira mudá-la em caso de atualização)"
                    value={form.senha}
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    name="imagem"
                    accept="image/*"
                    onChange={handleChange}
                />
                <button type="submit">
                    {editIndex !== null ? "Atualizar" : "Adicionar"}
                </button>
            </Form>

            <Table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Curso</th>
                        <th>Turno</th>
                        <th>Data de Nascimento</th>
                        <th>Imagem</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nome}</td>
                            <td>{item.email}</td>
                            <td>{cursos.find(c => String(c.id) === String(item.curso_id))?.nome || "Curso não encontrado"}</td>
                            <td>{turnos.find(t => String(t.id) === String(item.turno_id))?.nome || "Turno não encontrado"}</td>
                            <td>{formatDate(item.data_nasc) || "Data não disponível"}</td>
                            <td>
                                {item.imagem ? (
                                    <img
                                        src={`http://localhost:3000/api/usuario/imagem/${item.id}`}
                                        alt="Usuário"
                                        style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '50%' }}
                                    />
                                ) : (
                                    <span style={{ color: "#888" }}>Sem imagem</span>
                                )}
                            </td>
                            <td>
                                <button className="edit" onClick={() => handleEdit(index)}>
                                    Editar
                                </button>
                                <button className="delete" onClick={() => handleDelete(index)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}