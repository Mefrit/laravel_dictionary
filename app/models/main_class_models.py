from fastapi import FastAPI
from pydantic import BaseModel


class WordList(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

class NewWord(BaseModel):
    rus_value: str
    chinese_value: str 

class SearchWord(BaseModel):
    search_value: str
    mode: str 