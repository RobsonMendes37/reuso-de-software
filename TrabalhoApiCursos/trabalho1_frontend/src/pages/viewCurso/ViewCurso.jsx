import { useState, useEffect } from 'react';
import { getCurso } from '../../services/CursoServicer';
import { useParams, useNavigate } from 'react-router-dom';

const ViewCurso = () => {
  const [curso, setCurso] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getCurso(id) // Alterado para usar o serviço de cursos
        .then((response) => {
          setCurso(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  if (!curso) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <h2 className="text-center">Detalhes do Curso</h2>
      <div className="card col-md-8 offset-md-2">
        <div className="card-body">
          <p><strong>ID:</strong> {curso.id}</p>
          <p><strong>Título:</strong> {curso.titulo}</p>
          <p><strong>Categoria:</strong> {curso.categoria}</p>
          <p><strong>Carga Horária:</strong> {curso.carga_horaria} horas</p>
          <p><strong>Nível:</strong> {curso.nivel}</p>
          <p><strong>Preço:</strong> R$ {curso.preco.toFixed(2)}</p>
          <p><strong>Quantidade de Vagas:</strong> {curso.quantidade_vagas}</p>
          <p><strong>Instrutor:</strong> {curso.instrutor}</p>
          <p><strong>Plataforma:</strong> {curso.plataforma}</p>

          <button className="btn btn-primary mt-3" onClick={() => navigate('/cursos')}>
            Voltar para a Lista de Cursos
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCurso;
