import { useState, useEffect } from 'react';
import { updateCurso, getCurso } from '../../services/CursoServicer';
import { useNavigate } from 'react-router-dom';
import './UpdateCurso.css';

const UpdateCurso = () => {
    const navigate = useNavigate();

    // Estado para armazenar os campos do curso
    const [id, setId] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [cargaHoraria, setCargaHoraria] = useState(0);
    const [nivel, setNivel] = useState('');
    const [preco, setPreco] = useState(0);
    const [quantidadeVagas, setQuantidadeVagas] = useState(0);
    const [instrutor, setInstrutor] = useState('');
    const [plataforma, setPlataforma] = useState('');

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    // Buscar dados do curso ao carregar o componente
    useEffect(() => {
        if (id) {
            getCurso(id)
                .then((response) => {
                    const curso = response.data;
                    setTitulo(curso.titulo);
                    setCategoria(curso.categoria);
                    setCargaHoraria(curso.carga_horaria);
                    setNivel(curso.nivel);
                    setPreco(curso.preco);
                    setQuantidadeVagas(curso.quantidade_vagas);
                    setInstrutor(curso.instrutor);
                    setPlataforma(curso.plataforma);
                })
                .catch((error) => {
                    console.error('Erro ao buscar curso:', error);
                    setErrorMessage('Erro ao carregar os dados do curso.');
                });
        }
    }, [id]);

    // Função para validar os campos do formulário
    const validateForm = () => {
        const errors = {};

        if (!titulo.trim()) errors.titulo = 'Título é obrigatório.';
        if (!categoria.trim()) errors.categoria = 'Categoria é obrigatória.';
        if (cargaHoraria <= 0) errors.cargaHoraria = 'Carga horária deve ser maior que zero.';
        if (!nivel.trim()) errors.nivel = 'Nível é obrigatório.';
        if (preco <= 0) errors.preco = 'Preço deve ser maior que zero.';
        if (quantidadeVagas <= 0) errors.quantidadeVagas = 'Quantidade de vagas deve ser maior que zero.';
        if (!instrutor.trim()) errors.instrutor = 'Instrutor é obrigatório.';
        if (!plataforma.trim()) errors.plataforma = 'Plataforma é obrigatória.';

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Enviar atualização do curso
    const handleUpdate = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const curso = {
                id,
                titulo,
                categoria,
                carga_horaria: cargaHoraria,
                nivel,
                preco,
                quantidade_vagas: quantidadeVagas,
                instrutor,
                plataforma,
            };

            updateCurso(id, curso)
                .then(() => navigate('/cursos'))
                .catch((error) => {
                    console.error('Erro ao atualizar curso:', error);
                    setErrorMessage('Erro ao atualizar o curso.');
                });
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Atualizar Curso</h2>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form onSubmit={handleUpdate}>
                <div className="form-group mb-2">
                    <label>ID:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={id}
                        onChange={(e) => setId(Number(e.target.value))}
                        placeholder="Digite o ID do curso"
                        required
                    />
                </div>
                <div className="form-group mb-2">
                    <label>Título:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Digite o título do curso"
                    />
                    {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Categoria:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.categoria ? 'is-invalid' : ''}`}
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        placeholder="Digite a categoria do curso"
                    />
                    {errors.categoria && <div className="invalid-feedback">{errors.categoria}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Carga Horária:</label>
                    <input
                        type="number"
                        className={`form-control ${errors.cargaHoraria ? 'is-invalid' : ''}`}
                        value={cargaHoraria}
                        onChange={(e) => setCargaHoraria(Number(e.target.value))}
                        placeholder="Digite a carga horária"
                    />
                    {errors.cargaHoraria && <div className="invalid-feedback">{errors.cargaHoraria}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Nível:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.nivel ? 'is-invalid' : ''}`}
                        value={nivel}
                        onChange={(e) => setNivel(e.target.value)}
                        placeholder="Digite o nível do curso"
                    />
                    {errors.nivel && <div className="invalid-feedback">{errors.nivel}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Preço:</label>
                    <input
                        type="number"
                        className={`form-control ${errors.preco ? 'is-invalid' : ''}`}
                        value={preco}
                        onChange={(e) => setPreco(Number(e.target.value))}
                        placeholder="Digite o preço do curso"
                    />
                    {errors.preco && <div className="invalid-feedback">{errors.preco}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Quantidade de Vagas:</label>
                    <input
                        type="number"
                        className={`form-control ${errors.quantidadeVagas ? 'is-invalid' : ''}`}
                        value={quantidadeVagas}
                        onChange={(e) => setQuantidadeVagas(Number(e.target.value))}
                        placeholder="Digite a quantidade de vagas"
                    />
                    {errors.quantidadeVagas && <div className="invalid-feedback">{errors.quantidadeVagas}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Instrutor:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.instrutor ? 'is-invalid' : ''}`}
                        value={instrutor}
                        onChange={(e) => setInstrutor(e.target.value)}
                        placeholder="Digite o nome do instrutor"
                    />
                    {errors.instrutor && <div className="invalid-feedback">{errors.instrutor}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Plataforma:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.plataforma ? 'is-invalid' : ''}`}
                        value={plataforma}
                        onChange={(e) => setPlataforma(e.target.value)}
                        placeholder="Digite a plataforma do curso"
                    />
                    {errors.plataforma && <div className="invalid-feedback">{errors.plataforma}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Atualizar Curso</button>
            </form>
        </div>
    );
};

export default UpdateCurso;
