from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# SQLALCHEMY_DATABASE_URL = "mysql+pymysql://Mefrit1999:56189968.db@Mefrit1999.mysql.pythonanywhere-services.com?charset=utf8mb4"
SQLALCHEMY_DATABASE_URL = "sqlite:///./resources/sql_app.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()