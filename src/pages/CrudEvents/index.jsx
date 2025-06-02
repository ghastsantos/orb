import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Table, BackButton } from '../CrudNews/styles';

export function CrudEvents({ onNavigate }) {
    const [eventos, setEventos] = useState([]);
    const [form, setForm] = useState({
        titulo: '',
        descricao: '',
        localizacao: '',
        data_hora: '',
        link_externo: '',
        imagem: null
    });
    const [editIndex, setEditIndex] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        async function fetchEventos() {
            try {
                const res = await axios.get('http://localhost:3000/api/eventos');
                setEventos(res.data);
            } catch (error) {
                console.error("Erro ao buscar eventos:", error);
            }
        }
        fetchEventos();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imagem" && files && files[0]) {
            setForm((f) => ({
                ...f,
                imagem: files[0],
            }));
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setForm((f) => ({
                ...f,
                [name]: value,
            }));
        }
    };

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!usuario.id) {
            alert("Usuário não identificado. Faça login novamente.");
            return;
        }
        if (!form.titulo || !form.descricao || !form.localizacao || !form.data_hora) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const data = new FormData();
        data.append('titulo', form.titulo);
        data.append('descricao', form.descricao);
        data.append('localizacao', form.localizacao);

        // Ajusta formato para MySQL: 'YYYY-MM-DD HH:MM:SS'
        const dataHoraFormatada = form.data_hora.replace('T', ' ') + ':00';
        data.append('data_hora', dataHoraFormatada);

        data.append('link_externo', form.link_externo);
        if (form.imagem) data.append('imagem', form.imagem);
        data.append('organizador_id', usuario.id);

        try {
            if (editIndex !== null) {
                const id = eventos[editIndex].id;
                await axios.put(`http://localhost:3000/api/eventos/${id}`, data);
            } else {
                await axios.post('http://localhost:3000/api/eventos', data);
            }
            // Limpa o formulário e recarrega eventos
            setForm({
                titulo: '',
                descricao: '',
                localizacao: '',
                data_hora: '',
                link_externo: '',
                imagem: null
            });
            setPreview(null);
            setEditIndex(null);
            const res = await axios.get('http://localhost:3000/api/eventos');
            setEventos(res.data);
        } catch (error) {
            console.error("Erro ao salvar evento:", error);
            alert("Erro ao salvar evento. Verifique os campos e tente novamente.");
        }
    };

    const handleEdit = (index) => {
        const evento = eventos[index];
        setForm({
            titulo: evento.titulo,
            descricao: evento.descricao,
            localizacao: evento.localizacao,
            data_hora: evento.data_hora ? evento.data_hora.slice(0, 16) : '',
            link_externo: evento.link_externo || '',
            imagem: null
        });
        setEditIndex(index);
        setPreview(evento.temImagem ? `http://localhost:3000/api/eventos/imagem/${evento.id}` : null);
    };

    const handleDelete = async (index) => {
        const id = eventos[index].id;
        try {
            await axios.delete(`http://localhost:3000/api/eventos/${id}`);
            // Atualiza lista sem recarregar a página
            setEventos(eventos.filter((_, i) => i !== index));
        } catch (error) {
            console.error("Erro ao excluir evento:", error);
            alert("Erro ao excluir evento.");
        }
    };

    return (
        <Container>
            <h1>CRUD de Eventos</h1>
            <BackButton onClick={() => onNavigate("home")}>
                Voltar para Home
            </BackButton>
            <Form onSubmit={handleSubmit}>
                <input
                    name="titulo"
                    value={form.titulo}
                    onChange={handleChange}
                    placeholder="Título"
                    required
                />
                <textarea
                    name="descricao"
                    value={form.descricao}
                    onChange={handleChange}
                    placeholder="Descrição"
                    required
                />
                <input
                    name="localizacao"
                    value={form.localizacao}
                    onChange={handleChange}
                    placeholder="Local"
                    required
                />
                <input
                    type="datetime-local"
                    name="data_hora"
                    value={form.data_hora}
                    onChange={handleChange}
                    required
                />
                <input
                    name="link_externo"
                    value={form.link_externo}
                    onChange={handleChange}
                    placeholder="Link externo (opcional)"
                />
                <input
                    type="file"
                    name="imagem"
                    accept="image/*"
                    onChange={handleChange}
                />
                {preview && (
                    <div style={{ margin: "10px 0" }}>
                        <img
                            src={preview}
                            alt="Preview"
                            style={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 4 }}
                        />
                    </div>
                )}
                <button type="submit">
                    {editIndex !== null ? "Atualizar" : "Adicionar"}
                </button>
            </Form>
            <Table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Local</th>
                        <th>Data/Hora</th>
                        <th>Link</th>
                        <th>Imagem</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {eventos.map((ev, index) => (
                        <tr key={ev.id}>
                            <td>{ev.titulo}</td>
                            <td>{ev.descricao}</td>
                            <td>{ev.localizacao}</td>
                            <td>{ev.data_hora ? ev.data_hora.replace('T', ' ').slice(0, 16) : ''}</td>
                            <td>
                                {ev.link_externo ? (
                                    <a href={ev.link_externo} target="_blank" rel="noopener noreferrer">
                                        Acessar
                                    </a>
                                ) : (
                                    <span style={{ color: "#888" }}>-</span>
                                )}
                            </td>
                            <td>
                                {ev.temImagem ? (
                                    <img
                                        src={`http://localhost:3000/api/eventos/imagem/${ev.id}`}
                                        alt="Evento"
                                        style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }}
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