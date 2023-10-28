from fastapi import FastAPI
from pydantic import BaseModel

class NewWord(BaseModel):
    rus_value: str
    chinese_value: str 

class SearchWord(BaseModel):
    search_value: str
    mode: str 
