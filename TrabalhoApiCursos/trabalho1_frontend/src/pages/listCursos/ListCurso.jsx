import  { useState, useEffect } from 'react';
import { listCursos, deleteCurso } from '../../services/CursoServicer';
import { useNavigate } from 'react-router-dom';
import './ListCurso.css';

const ListCursos = () => {
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCursos();
  }, []);

  function getAllCursos() {
    listCursos()
      .then((response) => {
        setCursos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewCurso() {
    navigate('/add-curso');
  }

  function updateCurso(id) {
    navigate(`/edit-curso/${id}`);
  }

  function removeCurso(id) {
    deleteCurso(id)
      .then(() => {
        getAllCursos();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const viewCurso = (id) => {
    navigate(`/view-curso/${id}`);
  };

  return (
    <div className="container">
      <h2 className="text-center" id="title">
        Lista de Cursos
      </h2>
      <button className="btn btn-primary mb-2" onClick={addNewCurso}>
        Adicionar Curso
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Categoria</th>
            <th>Carga Horária</th>
            <th>Nível</th>
            <th>Preço</th>
            <th>Quantidade de Vagas</th>
            <th>Instrutor</th>
            <th>Plataforma</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id}>
              <td>{curso.id}</td>
              <td>{curso.titulo}</td>
              <td>{curso.categoria}</td>
              <td>{curso.carga_horaria} horas</td>
              <td>{curso.nivel}</td>
              <td>R$ {curso.preco.toFixed(2)}</td>
              <td>{curso.quantidade_vagas}</td>
              <td>{curso.instrutor}</td>
              <td>{curso.plataforma}</td>
              <td id="actions">
                <button className="btn btn-success" onClick={() => updateCurso(curso.id)}>
                  Atualizar
                </button>
                <button className="btn btn-danger" onClick={() => removeCurso(curso.id)}>
                  Excluir
                </button>
                <button className="btn btn-info" onClick={() => viewCurso(curso.id)}>
                  Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCursos;
