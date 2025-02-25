from pymongo import MongoClient
from bson import ObjectId
from typing import TypeVar, Generic, Dict
from abc import ABC, abstractmethod

T = TypeVar("T", bound=Dict)

class AbstractMongoBridge(ABC, Generic[T]):
    def __init__(self, collection_name: str, db_name: str = "trabalho_final_reuso_software", uri: str = "mongodb://localhost:27017"):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]
    
    @abstractmethod
    def insert(self, data: T) -> T:
        pass
    
    @abstractmethod
    def find_by_id(self, obj_id: str) -> T:
        pass
    
    @abstractmethod
    def update_by_id(self, obj_id: str, new_data: T) -> T:
        pass
    
    @abstractmethod
    def delete_by_id(self, obj_id: str) -> Dict[str, str]:
        pass


class MongoBridge(AbstractMongoBridge[T]):
    def insert(self, data: T) -> T:
        result = self.collection.insert_one(data)
        data["_id"] = str(result.inserted_id)
        return data
    
    def find_by_id(self, obj_id: str) -> T:
        document = self.collection.find_one({"_id": ObjectId(obj_id)})
        if document:
            document["_id"] = str(document["_id"])
        return document
    
    def update_by_id(self, obj_id: str, new_data: T) -> T:
        self.collection.update_one({"_id": ObjectId(obj_id)}, {"$set": new_data})
        return self.find_by_id(obj_id)
    
    def delete_by_id(self, obj_id: str) -> Dict[str, str]:
        self.collection.delete_one({"_id": ObjectId(obj_id)})
        return {"deleted": obj_id}


# Exemplo de uso com um modelo User
class UserRepository(MongoBridge[Dict]):
    def __init__(self):
        super().__init__("users")


# Criando instância e testando
db = UserRepository()
novo_usuario = {"name": "Alice", "email": "alice@example.com"}
inserido = db.insert(novo_usuario)
print("Inserido:", inserido)

usuario = db.find_by_id(inserido["_id"])
print("Encontrado:", usuario)

db.update_by_id(inserido["_id"], {"name": "Alice Updated"})
usuario_atualizado = db.find_by_id(inserido["_id"])
print("Atualizado:", usuario_atualizado)

db.delete_by_id(inserido["_id"])
print("Usuario deletado com ID:", inserido["_id"])
