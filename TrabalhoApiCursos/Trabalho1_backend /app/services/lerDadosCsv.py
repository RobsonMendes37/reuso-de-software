import csv
import os
from app.models.curso import Curso

csv_FILE = "app/database/database.csv"

def ler_dados_csv():
    cursos = []
    if os.path.exists(csv_FILE):
        with open(csv_FILE, mode="r", newline="") as file:
            reader = csv.DictReader(file)
            for row in reader:
                # Converte os campos necessários para os tipos corretos
                row["id"] = int(row["id"])
                row["carga_horaria"] = int(row["carga_horaria"])
                row["preco"] = float(row["preco"])
                row["quantidade_vagas"] = int(row["quantidade_vagas"])
                cursos.append(Curso(**row))
    else:
        print("O arquivo não existe")
    return cursos
