import { useState } from 'react';
import { createCurso } from '../../services/CursoServicer';
import { useNavigate } from 'react-router-dom';
import './AddCurso.css';

const AddCurso = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: 0,
    titulo: '',
    categoria: 'tecnologia',
    carga_horaria: 0,
    nivel: 'iniciante',
    preco: 0,
    quantidade_vagas: 0,
    instrutor: '',
    plataforma: ''
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.id) {
      newErrors.id = 'ID é obrigatório';
      isValid = false;
    }

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório';
      isValid = false;
    }

    if (!formData.categoria.trim()) {
      newErrors.categoria = 'Categoria é obrigatória';
      isValid = false;
    }

    if (!formData.carga_horaria || isNaN(formData.carga_horaria) || parseInt(formData.carga_horaria) <= 0) {
      newErrors.carga_horaria = 'Carga horária inválida';
      isValid = false;
    }

    if (!formData.nivel.trim()) {
      newErrors.nivel = 'Nível é obrigatório';
      isValid = false;
    }

    if (!formData.preco || isNaN(formData.preco) || parseFloat(formData.preco) <= 0) {
      newErrors.preco = 'Preço inválido';
      isValid = false;
    }

    if (!formData.quantidade_vagas || isNaN(formData.quantidade_vagas) || parseInt(formData.quantidade_vagas) <= 0) {
      newErrors.quantidade_vagas = 'Quantidade de vagas inválida';
      isValid = false;
    }

    if (!formData.instrutor.trim()) {
      newErrors.instrutor = 'Instrutor é obrigatório';
      isValid = false;
    }

    if (!formData.plataforma.trim()) {
      newErrors.plataforma = 'Plataforma é obrigatória';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const saveCurso = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const curso = {
      ...formData,
      id: parseInt(formData.id),
      preco: parseFloat(formData.preco),
      carga_horaria: parseInt(formData.carga_horaria),
      quantidade_vagas: parseInt(formData.quantidade_vagas),
    };

    try {
      const response = await createCurso(curso);
      console.log('Curso salvo com sucesso:', response.data);
      navigate('/cursos');
    } catch (error) {
      console.error('Erro ao salvar curso:', error.response?.data || error);
      setErrorMessage(
        error.response?.data?.detail || 'Erro desconhecido ao salvar curso'
      );
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Adicionar Curso</h2>
      <div className="card col-md-10 offset-md-1">
        <div className="card-body">
          <form id="cursoForm" onSubmit={saveCurso}>
            <div className="form-group">
              <label>ID:</label>
              <input
                type="number"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                className={`form-control ${errors.id ? 'is-invalid' : ''}`}
              />
              {errors.id && <div className="invalid-feedback">{errors.id}</div>}
            </div>

            <div className="form-group">
              <label>Título:</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
              />
              {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
            </div>

            <div className="form-group">
              <label>Categoria:</label>
              <input
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                className={`form-control ${errors.categoria ? 'is-invalid' : ''}`}
              />
              {errors.categoria && <div className="invalid-feedback">{errors.categoria}</div>}
            </div>

            <div className="form-group">
              <label>Carga Horária:</label>
              <input
                type="number"
                name="carga_horaria"
                value={formData.carga_horaria}
                onChange={handleInputChange}
                className={`form-control ${errors.carga_horaria ? 'is-invalid' : ''}`}
              />
              {errors.carga_horaria && <div className="invalid-feedback">{errors.carga_horaria}</div>}
            </div>

            <div className="form-group">
              <label>Nível:</label>
              <input
                type="text"
                name="nivel"
                value={formData.nivel}
                onChange={handleInputChange}
                className={`form-control ${errors.nivel ? 'is-invalid' : ''}`}
              />
              {errors.nivel && <div className="invalid-feedback">{errors.nivel}</div>}
            </div>

            <div className="form-group">
              <label>Preço:</label>
              <input
                type="number"
                name="preco"
                value={formData.preco}
                onChange={handleInputChange}
                className={`form-control ${errors.preco ? 'is-invalid' : ''}`}
              />
              {errors.preco && <div className="invalid-feedback">{errors.preco}</div>}
            </div>

            <div className="form-group">
              <label>Quantidade de Vagas:</label>
              <input
                type="number"
                name="quantidade_vagas"
                value={formData.quantidade_vagas}
                onChange={handleInputChange}
                className={`form-control ${errors.quantidade_vagas ? 'is-invalid' : ''}`}
              />
              {errors.quantidade_vagas && <div className="invalid-feedback">{errors.quantidade_vagas}</div>}
            </div>

            <div className="form-group">
              <label>Instrutor:</label>
              <input
                type="text"
                name="instrutor"
                value={formData.instrutor}
                onChange={handleInputChange}
                className={`form-control ${errors.instrutor ? 'is-invalid' : ''}`}
              />
              {errors.instrutor && <div className="invalid-feedback">{errors.instrutor}</div>}
            </div>

            <div className="form-group">
              <label>Plataforma:</label>
              <input
                type="text"
                name="plataforma"
                value={formData.plataforma}
                onChange={handleInputChange}
                className={`form-control ${errors.plataforma ? 'is-invalid' : ''}`}
              />
              {errors.plataforma && <div className="invalid-feedback">{errors.plataforma}</div>}
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Salvar
            </button>
          </form>
          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default AddCurso;
