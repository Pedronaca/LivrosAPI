from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional

import models
from database import engine, get_db

# Cria as tabelas automaticamente na inicialização
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Catálogo de Livros API")

# Libera requisições do frontend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schemas de validação de dados
class LivroCreate(BaseModel):
    titulo: str
    autor: str
    genero: Optional[str] = None
    ano: Optional[int] = None
    lido: bool = False

class LivroResponse(LivroCreate):
    id: int

    class Config:
        from_attributes = True

# Rotas
@app.get("/livros", response_model=List[LivroResponse])
def listar_livros(db: Session = Depends(get_db)):
    return db.query(models.Livro).all()

@app.post("/livros", response_model=LivroResponse, status_code=201)
def criar_livro(livro: LivroCreate, db: Session = Depends(get_db)):
    db_livro = models.Livro(**livro.model_dump())
    db.add(db_livro)
    db.commit()
    db.refresh(db_livro)
    return db_livro

@app.delete("/livros/{livro_id}", status_code=204)
def deletar_livro(livro_id: int, db: Session = Depends(get_db)):
    livro = db.query(models.Livro).filter(models.Livro.id == livro_id).first()
    if not livro:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    db.delete(livro)
    db.commit()
    return None

@app.put("/livros/{livro_id}", response_model=LivroResponse)
def atualizar_livro(livro_id: int, livro: LivroCreate, db: Session = Depends(get_db)):
    db_livro = db.query(models.Livro).filter(models.Livro.id == livro_id).first()
    if not db_livro:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    
    for key, value in livro.model_dump().items():
        setattr(db_livro, key, value)
    
    db.commit()
    db.refresh(db_livro)
    return db_livro