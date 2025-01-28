import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8000/cursos';

export const listCursos = () =>  axios.get(REST_API_BASE_URL)

export const createCurso = (curso) => axios.post(REST_API_BASE_URL, curso);

export const getCurso = (cursoId) => axios.get(REST_API_BASE_URL + '/' + cursoId);

export const updateCurso = (cursoId , curso) => axios.put(REST_API_BASE_URL + '/' + cursoId,curso);

export const deleteCurso = (cursoId) => axios.delete(REST_API_BASE_URL + '/' + cursoId)

