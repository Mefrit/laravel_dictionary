from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# SQLALCHEMY_DATABASE_URL = "sqlite:///./resources/sql_app.db"

SQLALCHEMY_DATABASE_URL = "postgresql://chinese_dictionary_user:eKDT7Op9a5jGbCpatwgnPItBeMDOvx7c@dpg-ckv4t3q37rbc73enkfb0-a.oregon-postgres.render.com/chinese_dictionary"


engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()