import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Table, BackButton } from './styles';

export function CrudNews({ onNavigate }) {
    const [noticias, setNoticias] = useState([]);
    const [form, setForm] = useState({
        titulo: '',
        conteudo: '',
        imagem: null,
        data_publicacao: ''
    });
    const [editIndex, setEditIndex] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        async function fetchNoticias() {
            try {
                const res = await axios.get('http://localhost:3000/api/noticias');
                setNoticias(res.data);
            } catch (error) {
                console.error("Erro ao buscar notícias:", error);
            }
        }
        fetchNoticias();
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
        const data = new FormData();
        data.append('titulo', form.titulo);
        data.append('conteudo', form.conteudo);
        data.append('data_publicacao', form.data_publicacao);
        if (form.imagem) data.append('imagem', form.imagem);
        data.append('autor_id', usuario.id);

        try {
            if (editIndex !== null) {
                const id = noticias[editIndex].id;
                await axios.put(`http://localhost:3000/api/noticias/${id}`, data);
            } else {
                await axios.post('http://localhost:3000/api/noticias', data);
            }
            window.location.reload(); // Força refresh após submit
        } catch (error) {
            console.error("Erro ao salvar notícia:", error);
        }
    };

    const handleEdit = (index) => {
        const noticia = noticias[index];
        setForm({
            titulo: noticia.titulo,
            conteudo: noticia.conteudo,
            imagem: null,
            data_publicacao: noticia.data_publicacao ? noticia.data_publicacao.split('T')[0] : ''
        });
        setEditIndex(index);
        setPreview(noticia.temImagem ? `http://localhost:3000/api/noticias/imagem/${noticia.id}` : null);
    };

    const handleDelete = async (index) => {
        const id = noticias[index].id;
        try {
            await axios.delete(`http://localhost:3000/api/noticias/${id}`);
            window.location.reload(); // Força refresh após delete
        } catch (error) {
            console.error("Erro ao excluir notícia:", error);
        }
    };

    return (
        <Container>
            <h1>CRUD de Notícias</h1>
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
                    name="conteudo"
                    value={form.conteudo}
                    onChange={handleChange}
                    placeholder="Conteúdo"
                    required
                />
                <input
                    type="date"
                    name="data_publicacao"
                    value={form.data_publicacao || ""}
                    onChange={handleChange}
                    required
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
                        <th>Conteúdo</th>
                        <th>Data de Publicação</th>
                        <th>Imagem</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {noticias.map((n, index) => (
                        <tr key={n.id}>
                            <td>{n.titulo}</td>
                            <td>{n.conteudo}</td>
                            <td>{n.data_publicacao ? n.data_publicacao.split('T')[0] : ''}</td>
                            <td>
                                {n.temImagem ? (
                                    <img
                                        src={`http://localhost:3000/api/noticias/imagem/${n.id}`}
                                        alt="Notícia"
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
