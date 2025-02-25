from pymongo import MongoClient
from bson import ObjectId

# Configurações do MongoDB
db_name = "trabalho_final_reuso_software"
uri = "mongodb://localhost:27017"
collection_name = "users"

# Conexão com o MongoDB
client = MongoClient(uri)
db = client[db_name]
collection = db[collection_name]

# Função para inserir um usuário
def insert_user(data):
    result = collection.insert_one(data)
    data["_id"] = str(result.inserted_id)
    return data

# Função para encontrar um usuário pelo ID
def find_user_by_id(obj_id):
    document = collection.find_one({"_id": ObjectId(obj_id)})
    if document:
        document["_id"] = str(document["_id"])
    return document

# Função para atualizar um usuário pelo ID
def update_user_by_id(obj_id, new_data):
    collection.update_one({"_id": ObjectId(obj_id)}, {"$set": new_data})
    return find_user_by_id(obj_id)

# Função para deletar um usuário pelo ID
def delete_user_by_id(obj_id):
    collection.delete_one({"_id": ObjectId(obj_id)})
    return {"deleted": obj_id}

# Exemplo de uso
if __name__ == "__main__":
    novo_usuario = {"name": "Alice", "email": "alice@example.com"}
    
    # Inserindo o usuário
    inserido = insert_user(novo_usuario)
    print("Inserido:", inserido)

    # Encontrando o usuário
    usuario = find_user_by_id(inserido["_id"])
    print("Encontrado:", usuario)

    # Atualizando o usuário
    update_user_by_id(inserido["_id"], {"name": "Alice Updated"})
    usuario_atualizado = find_user_by_id(inserido["_id"])
    print("Atualizado:", usuario_atualizado)

    # Deletando o usuário
    delete_user_by_id(inserido["_id"])
    print("Usuário deletado com ID:", inserido["_id"])
