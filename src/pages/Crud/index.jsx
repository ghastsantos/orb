import React from "react";

export function Crud({ onNavigate}){
    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">CRUD de Usuários</h1>
            <button
                onClick={() => onNavigate("login")}
                className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
            >
                Ir para Login
            </button>

            <form onSubmit={handleSubmit} className="mb-4 space-y-2">
                <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Nome"
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    required
                />

                <select
                    name="curso_id"
                    value={form.curso_id}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
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
                    className="w-full border p-2 rounded"
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
                    className="w-full border p-2 rounded"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {editIndex !== null ? "Atualizar" : "Adicionar"}
                </button>
            </form>

            <table className="w-full border">
                <thead>
                    <tr>
                        <th className="border p-2">Nome</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Curso</th>
                        <th className="border p-2">Turno</th>
                        <th className="border p-2">Data de Nascimento</th>
                        <th className="border p-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((item, index) => (
                        <tr key={index}>
                            <td className="border p-2">{item.nome}</td>
                            <td className="border p-2">{item.email}</td>
                            <td className="border p-2">
                                {cursos.find(c => c.id === item.curso_id)?.nome || item.curso_id}
                            </td>
                            <td className="border p-2">
                                {turnos.find(t => t.id === item.turno_id)?.nome || item.turno_id}
                            </td>
                            <td className="border p-2">{formatDate(item.data_nasc)}</td>
                            <td className="border p-2 space-x-2">
                                <button
                                    onClick={() => handleEdit(index)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}