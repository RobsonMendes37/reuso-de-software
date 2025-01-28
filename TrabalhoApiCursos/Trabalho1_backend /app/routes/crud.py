from http.client import CREATED
from fastapi import APIRouter, HTTPException
from app.models.curso import Curso
from app.logs.logger import enviar_log as send_log
from app.services.lerDadosCsv import ler_dados_csv as read_csv_data
from app.services.escreverDadosCsv import escrever_dados_csv as write_csv_data 

crud_router = APIRouter()
CSV_FILE = "app/database/cursos.csv"

# GET
@crud_router.get("/cursos", response_model=list[Curso])
def list_cursos():
    try:
        send_log("Starting to list cursos via '/cursos'...")
        cursos = read_csv_data()
        send_log("Successfully listed cursos via '/cursos'")
        return cursos
    except Exception as e:
        error_msg = f"Error listing cursos: {str(e)}"
        send_log(error_msg)
        raise HTTPException(status_code=500, detail="Internal error occurred while processing '/cursos'.")

# GET by ID
@crud_router.get("/cursos/{id}", response_model=Curso)
def get_curso_by_id(id: int):
    try:
        send_log(f"Starting search for curso with ID '{id}' via '/cursos/{id}'...")
        cursos = read_csv_data()
        for curso in cursos:
            if curso.id == id:
                send_log(f"Curso with ID '{id}' found via '/cursos/{id}'")
                return curso
        send_log(f"Curso with ID '{id}' not found via '/cursos/{id}'")
        raise HTTPException(status_code=404, detail="Curso not found")
    except Exception as e:
        error_msg = f"Error retrieving curso with ID '{id}' via '/cursos/{id}': {str(e)}"
        send_log(error_msg)
        raise HTTPException(status_code=500, detail="Internal error occurred while processing '/cursos/{id}'.")

# POST
@crud_router.post("/cursos", response_model=Curso, status_code=201)
def create_curso(curso: Curso):
    try:
        send_log(f"Starting curso creation with ID '{curso.id}' via '/cursos'...")
        cursos = read_csv_data()
        for existing_curso in cursos:
            if existing_curso.id == curso.id:
                send_log(f"Failed to create curso: Curso with ID '{curso.id}' already exists.")
                raise HTTPException(status_code=400, detail="Curso already exists")
        cursos.append(curso)
        write_csv_data(cursos)
        send_log(f"Curso with ID '{curso.id}' successfully created via '/cursos'")
        return curso
    except HTTPException as http_ex:
        raise http_ex
    except Exception as e:
        error_msg = f"Error creating curso with ID '{curso.id}' via '/cursos': {str(e)}"
        send_log(error_msg)
        raise HTTPException(status_code=500, detail="Internal error occurred while processing '/cursos'.")

# PUT
@crud_router.put("/cursos/{id}", response_model=Curso)
def update_curso(id: int, updated_curso: Curso):
    try:
        send_log(f"Starting update for curso with ID '{id}' via '/cursos'...")
        cursos = read_csv_data()
        for i, curso in enumerate(cursos):
            if curso.id == id:
                cursos[i] = updated_curso
                write_csv_data(cursos)
                send_log(f"Curso with ID '{id}' successfully updated via '/cursos'")
                return updated_curso
        send_log(f"Failed to update curso: Curso with ID '{id}' not found.")
        raise HTTPException(status_code=404, detail="Curso not found")
    except HTTPException as http_ex:
        raise http_ex
    except Exception as e:
        error_msg = f"Error updating curso with ID '{id}' via '/cursos': {str(e)}"
        send_log(error_msg)
        raise HTTPException(status_code=500, detail="Internal error occurred while processing '/cursos'.")

# DELETE
@crud_router.delete("/cursos/{id}")
def delete_curso(id: int):
    try:
        send_log(f"Starting deletion of curso with ID '{id}' via '/cursos'...")
        cursos = read_csv_data()
        filtered_cursos = [curso for curso in cursos if curso.id != id]
        if len(cursos) == len(filtered_cursos):
            send_log(f"Failed to delete curso: Curso with ID '{id}' not found.")
            raise HTTPException(status_code=404, detail="Curso not found")
        write_csv_data(filtered_cursos)
        send_log(f"Curso with ID '{id}' successfully deleted via '/cursos'")
        return {"message": "Curso deleted"}
    except Exception as e:
        error_msg = f"Error deleting curso with ID '{id}' via '/cursos': {str(e)}"
        send_log(error_msg)
        raise HTTPException(status_code=500, detail="Internal error occurred while processing '/cursos'.")
