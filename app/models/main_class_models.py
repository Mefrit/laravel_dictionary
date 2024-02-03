from fastapi import FastAPI
from pydantic import BaseModel


class WordList(BaseModel):
    name: str
    description: str
    price: float
    tax: float 

class NewWord(BaseModel):
    rus_value: str
    chinese_value: str 

class EditWord(BaseModel):
    rus_value: str
    chinese_value: str 
    word_id:int


class SearchWord(BaseModel):
    search_value: str
    mode: str 

class DeleteRaw(BaseModel):
    word_id: str