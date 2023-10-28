from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..database import Base


class WordsTable(Base):
    __tablename__ = "Words"

    id = Column(Integer, primary_key=True, index=True)
    rus_value = Column(String, unique=True, index=True)
    chinese_value = Column(String, index=True)
