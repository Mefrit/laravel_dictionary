from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# SQLALCHEMY_DATABASE_URL = "mysql+pymysql://Mefrit1999:56189968.Ru@Mefrit1999.mysql.pythonanywhere-services.com?charset=utf8mb4/Mefrit1999$default"
SQLALCHEMY_DATABASE_URL = "sqlite:///./resources/sql_app.db?charset=utf8"
# DB = {
#     'drivername': 'mysql+pymysql',
#     'host': '127.0.0.1',
#     'port': '3306',
#     'username': os.environ['DBUNAME'],
#     'password': os.environ['DBPASS'],
#     'database': os.environ['DBNAME'],
#     'query': {'charset':'utf8'}
# }


# SQLALCHEMY_DATABASE_URL = "mysql+pymysql://Mefrit1999:56189968.Ru@Mefrit1999.mysql.pythonanywhere-services.com/Mefrit1999$default?charset=utf8mb4"
# SQLALCHEMY_DATABASE_URL = "sqlite:///./resources/sql_app.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()