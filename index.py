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

from  sqlalchemy.sql.expression import func, select
from sqlalchemy.orm.attributes import set_committed_value



app = Flask(__name__)

Base.metadata.create_all(bind=engine)

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

# url_for('static', filename='style.css')
# app.mount("/public", StaticFiles(directory="public"), name="public")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )

@app.route('/')
def root():
    return {"message": "Hello World"}

@app.route('/load_dictionary')
def load_dictionary():
    return {"result": True, "list": ["Hello Worl!!!d"]}

@app.route('/load')
async def load():
    return {"list": ["Hello it is work!!!"]}

@app.route('/addWordToDictionary', methods=['POST'])
def addWordToDictionary(word_raw: NewWord):
    """
    добавит новое словов в словарь
    """
    session = Session(bind=engine, expire_on_commit=False)

    word_obj = WordsTable(rus_value=str(word_raw.rus_value), chinese_value=str(word_raw.chinese_value))

    session.add(word_obj)

    session.commit()

    id = word_obj.id

    session.close()

    return {'result': True, 'word_id': str(id)}

@app.route('/editWord', methods=['POST'])
def editWord(word_id, rus_value, chinese_value):
    """
    добавит новое словов в словарь
    """
    session = Session(bind=engine, expire_on_commit=False)
    
    rows = session.query(WordsTable).filter(WordsTable.id == word_id).update(
        {
            'rus_value': rus_value,
            'chinese_value': chinese_value
        }
    )
   
    # session.add(word)
    # set_committed_value(word, 'rus_value', word_raw.rus_value)
    # set_committed_value(word, 'chinese_value', word_raw.chinese_value)

    session.commit()
    # id = word.id
    # session.close()

    return {'result': True, 'rows': str(rows)}

@app.route("/FindTranslate", methods=['POST'])
def FindTranslate(word_raw: SearchWord):
    search_value = word_raw.search_value.lower()
    session = Session(bind=engine, expire_on_commit=False)
    results = session.query(WordsTable).filter(
        WordsTable.rus_value.startswith(search_value) \
        if word_raw.mode == 'russian'\
        else  \
            WordsTable.chinese_value.startswith(search_value)
    ).all()

    return {'result': True, 'list': results}

@app.route("/Delete", methods=['POST'])
def Delete(word_raw: DeleteRaw):

    session = Session(bind=engine, expire_on_commit=False)

    word = session.query(WordsTable).filter(WordsTable.id == word_raw.word_id).one()
    # если пользователь найден, удаляем его
    session.delete(word)  # удаляем объект
    session.commit()
    return {'result': True, 'word': word}

@app.route("/GetRandomWords")
def GetRandomWords():

    session = Session(bind=engine, expire_on_commit=False)
    results = session.query(WordsTable).order_by(
            func.random()
        ).limit(40).all()

    return {'result': True, 'list':[
            {'id': _.id,'rus_value': _.rus_value,'chinese_value': _.chinese_value} for _ in results
        ]
    }



app.run(debug = True)