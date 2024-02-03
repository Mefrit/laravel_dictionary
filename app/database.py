from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


SQLALCHEMY_DATABASE_URL = "mysql+pymysql://Mefrit1999:56189968.Ru@Mefrit1999.mysql.pythonanywhere-services.com?charset=utf8mb4"
# SQLALCHEMY_DATABASE_URL = "sqlite:///./resources/sql_app.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()