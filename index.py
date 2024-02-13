# from fastapi import FastAPI, status
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles
from flask import Flask
from flask import url_for
from app.database import engine
from app.models.main_class_models import NewWord, SearchWord, DeleteRaw, EditWord
from sqlalchemy.orm import Session
from app.models.base_table_models import WordsTable
from app.database import Base, SessionLocal

from sqlalchemy.sql.expression import func, select
from sqlalchemy.orm.attributes import set_committed_value
from flask import request


app = Flask(__name__)
origins = [
    "http://localhost:3000",
    "localhost:3000"
]

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

@app.route('/')
def root():
    return {"message": "Hello World"}

@app.route('/load_dictionary')
def load_dictionary():
    return {"result": True, "list": ["Hello Worl!!!d"]}

@app.route('/load')
async def load():
    return {"list": ["Hello it is work!!!"]}

@app.post('/addWordToDictionary')
def addWordToDictionary():
    """
    добавит новое словов в словарь
    """
    word_raw = request.get_json(force=False, silent=False, cache=True)
    session = Session(bind=engine, expire_on_commit=False)

    word_obj = WordsTable(rus_value=str(word_raw['rus_value']), chinese_value=str(word_raw['chinese_value']))

    session.add(word_obj)

    session.commit()

    id = word_obj.id

    session.close()

    return {'result': True, 'word_id': str(id)}

@app.post('/editWord')
def editWord():
    """
    редактирует новое словов в словарь
    """
    word_raw = request.get_json(force=False, silent=False, cache=True)
    try:
        session = Session(bind=engine, expire_on_commit=False)
        word_id = int(word_raw['word_id'])

        rows = session.query(WordsTable).filter(WordsTable.id == word_id).update(
            {
                'rus_value': word_raw['rus_value'],
                'chinese_value': word_raw['chinese_value']
            }
        )
        session.commit()
    except:
        return {'result': False, 'message': 'Ошибка при редактировании слова. Проверьте входные значения'}
    return {'result': True, 'rows': str(rows)}

@app.post("/FindTranslate")
def FindTranslate():
    """
    Поиск перевода
    """
    word_raw = request.get_json(force=False, silent=False, cache=True)

    search_value = word_raw['search_value']
    mode = word_raw['mode']
    session = Session(bind=engine, expire_on_commit=False)
 
    results = session.query(WordsTable).filter(
        WordsTable.rus_value.startswith(search_value) \
        if mode == 'russian'\
        else \
            WordsTable.chinese_value.startswith(search_value)
    ).all()
    return {'result': True, 'list': [{'rus_value': _.rus_value, 'chinese_value': _.chinese_value, 'id': _.id} for _ in results]}

@app.post("/Delete")
def Delete():
    """
    Удаление слвоа из словаря
    """
    word_raw = request.get_json(force=False, silent=False, cache=True)
    session = Session(bind=engine, expire_on_commit=False)
    try:
        word = session.query(WordsTable).filter(WordsTable.id == int(word_raw['word_id'])).one()
        # если пользователь найден, удаляем его
        print(word)
        session.delete(word)  # удаляем объект
        session.commit()
    except:
        return {'result': False, 'message': 'ошибка при удалении слова'}
    
    return {'result': True, 'word': {'id': word.id}}

@app.route("/GetRandomWords")
def GetRandomWords():
    """
    Получение рандомного списка слов
    """
    session = Session(bind=engine, expire_on_commit=False)
    results = session.query(WordsTable).order_by(
        func.random()
    ).limit(40).all()

    return {'result': True, 'list':[
            {'id': _.id,'rus_value': _.rus_value,'chinese_value': _.chinese_value} for _ in results
        ]
    }


if __name__ == '__main__':
    app.run()