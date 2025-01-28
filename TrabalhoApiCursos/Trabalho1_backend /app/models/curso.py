from pydantic import BaseModel
from typing import Literal

class Curso(BaseModel):
    id: int
    titulo: str
    categoria: Literal['tecnologia', 'negocios', 'saude', 'educacao']
    carga_horaria: int
    nivel: Literal['iniciante', 'basico','intermediario', 'avancado', 'mestre']
    preco: float
    quantidade_vagas: int
    instrutor: str
    plataforma: str
