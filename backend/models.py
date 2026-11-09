from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class Livro(Base):
    __tablename__ = "livros"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    autor = Column(String, nullable=False)
    genero = Column(String, nullable=True)
    ano = Column(Integer, nullable=True)
    lido = Column(Boolean, default=False)