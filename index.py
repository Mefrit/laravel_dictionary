from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.database import engine
from app.models.main_class_models import NewWord, SearchWord, DeleteRaw, EditWord
from sqlalchemy.orm import Session
from app.models.base_table_models import WordsTable
from app.database import Base, SessionLocal 

from  sqlalchemy.sql.expression import func, select
from sqlalchemy.orm.attributes import set_committed_value

app = FastAPI()

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


app.mount("/public", StaticFiles(directory="public"), name="public")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get('/')
def root():
    return {"message": "Hello World"}

@app.post('/load_dictionary')
def load_dictionary():
    return {"result": True, "list": ["Hello Worl!!!d"]}

@app.get('/load')
async def load():
    return {"list": ["Hello it is work!!!"]}




@app.post('/addWordToDictionary', status_code=status.HTTP_201_CREATED)
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

@app.post('/editWord', status_code=status.HTTP_201_CREATED)
def editWord(word_raw: EditWord):
    """
    добавит новое словов в словарь
    """
    session = Session(bind=engine, expire_on_commit=False)
    
    rows = session.query(WordsTable).filter(WordsTable.id == word_raw.word_id).update(
        {
            'rus_value': word_raw.rus_value,
            'chinese_value': word_raw.chinese_value
        }
    )
   
    # session.add(word)
    # set_committed_value(word, 'rus_value', word_raw.rus_value)
    # set_committed_value(word, 'chinese_value', word_raw.chinese_value)

    session.commit()
    # id = word.id
    # session.close()

    return {'result': True, 'rows': str(rows)}

@app.post("/FindTranslate")
async def find_translate(word_raw: SearchWord):
    search_value = word_raw.search_value.lower()
    session = Session(bind=engine, expire_on_commit=False)
    results = session.query(WordsTable).filter(
        WordsTable.rus_value.startswith(search_value) \
        if word_raw.mode == 'russian'\
        else  \
            WordsTable.chinese_value.startswith(search_value)
    ).all()

    return {'result': True, 'list': results}

@app.post("/Delete")
def find_translate(word_raw: DeleteRaw):

    session = Session(bind=engine, expire_on_commit=False)

    word = session.query(WordsTable).filter(WordsTable.id == word_raw.word_id).one()
    # если пользователь найден, удаляем его
    session.delete(word)  # удаляем объект
    session.commit()
    return {'result': True, 'word': word}

@app.get("/GetRandomWords")
def find_translate():

    session = Session(bind=engine, expire_on_commit=False)
    results = session.query(WordsTable).order_by(
            func.random()
        ).limit(40).all()

    return {'result': True, 'list': results}
