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

# Inserindo um usuário
novo_usuario = {"name": "Alice", "email": "alice@example.com"}
result = collection.insert_one(novo_usuario)
novo_usuario["_id"] = str(result.inserted_id)
print("Inserido:", novo_usuario)

# Encontrando o usuário pelo ID
usuario_id = novo_usuario["_id"]
document = collection.find_one({"_id": ObjectId(usuario_id)})
if document:
    document["_id"] = str(document["_id"])
print("Encontrado:", document)

# Atualizando o usuário pelo ID
new_data = {"name": "Alice Updated"}
collection.update_one({"_id": ObjectId(usuario_id)}, {"$set": new_data})
usuario_atualizado = collection.find_one({"_id": ObjectId(usuario_id)})
usuario_atualizado["_id"] = str(usuario_atualizado["_id"])
print("Atualizado:", usuario_atualizado)

# Deletando o usuário pelo ID
collection.delete_one({"_id": ObjectId(usuario_id)})
print("Usuário deletado com ID:", usuario_id)
