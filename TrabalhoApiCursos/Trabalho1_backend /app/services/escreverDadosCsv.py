import csv
from app.models.curso import Curso

csv_FILE = "app/database/database.csv"

# Escrever os dados no CSV
def escrever_dados_csv(cursos):
    with open(csv_FILE, mode="w", newline="") as file:
        fieldnames = ["id", "titulo", "categoria", "carga_horaria", "nivel", "preco", "quantidade_vagas", "instrutor", "plataforma"]
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        for curso in cursos:
            # Converte 'categoria' e 'nivel' para string explicitamente, caso necessário
            curso_dict = curso.dict()
            curso_dict['categoria'] = str(curso.categoria)  # Certificando-se de que 'categoria' é string
            curso_dict['nivel'] = str(curso.nivel)  # Certificando-se de que 'nivel' é string
            writer.writerow(curso_dict)
