# 🐋 DockerBooks - Catálogo de Livros API

Aplicação *Full Stack* para gerenciamento de biblioteca pessoal, desenvolvida com **FastAPI**, **PostgreSQL**, **HTML/CSS/JavaScript** e totalmente conteinerizada com **Docker** e **Docker Compose**.

---

## 📌 Funcionalidades

- [x] **Cadastrar Livro**: Título, autor, gênero, ano de publicação e status de leitura.
- [x] **Listar Livros**: Visualização em cards responsivos.
- [x] **Atualizar Livro (`PUT`)**: Alternar status de leitura ("Lido" / "Não lido") ou atualizar informações.
- [x] **Excluir Livro (`DELETE`)**: Remoção rápida com atualização dinâmica da interface.
- [x] **Documentação Interativa (Swagger/OpenAPI)**: Teste dos endpoints diretamente pelo navegador.

---

## 🛠️ Tecnologias Utilizadas
 
### Backend
- **Python 3.11**
- **FastAPI** (Framework Web assíncrono e de alta performance)
- **SQLAlchemy** (ORM para persistência de dados)
- **Pydantic** (Validação e serialização de dados)
- **Uvicorn** (Servidor ASGI)

### Banco de Dados
- **PostgreSQL 15** (com persistência via volumes Docker)

### Frontend
- **HTML5 & CSS3** (Interface moderna e responsiva)
- **JavaScript Vanilla** (Consumo da API REST com `fetch`)
- **Nginx Alpine** (Servidor web leve para servir os arquivos estáticos)

### DevOps
- **Docker** & **Docker Compose** (Orquestração de múltiplos containers)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados na sua máquina.

### Passo a Passo

1. **Clone o repositório** (ou acesse a pasta raiz do projeto):
   ```bash
   cd LivrosAPI
   ```

2. **Inicie os containers com Docker Compose**:
   ```bash
   docker compose up -d --build
   ```

3. **Acesse as aplicações no seu navegador**:
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend API (Swagger UI):** [http://localhost:8000/docs](http://localhost:8000/docs)
   - **Documentação alternativa (ReDoc):** [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 📖 Rotas da API (Endpoints)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/livros` | Lista todos os livros cadastrados |
| `POST` | `/livros` | Cadastra um novo livro |
| `PUT` | `/livros/{livro_id}` | Atualiza os dados de um livro existente |
| `DELETE` | `/livros/{livro_id}` | Remove um livro pelo ID |

---

## 📂 Estrutura do Projeto

```text
LivrosAPI/
├── backend/
│   ├── database.py       # Configuração de conexão com o banco de dados
│   ├── Dockerfile        # Imagem Docker do backend Python/FastAPI
│   ├── main.py           # Definição das rotas da API e inicialização
│   ├── models.py         # Modelos de tabelas SQLAlchemy
│   └── requirements.txt  # Dependências Python
├── frontend/
│   ├── Dockerfile        # Imagem Docker do servidor Nginx
│   ├── index.html        # Página principal da aplicação
│   ├── script.js         # Lógica de integração com a API (fetch)
│   └── style.css         # Estilização visual dos cards e formulário
├── docker-compose.yml     # Orquestração dos serviços (db, backend, frontend)
└── README.md             # Documentação do projeto
```

---

## 🛑 Comandos Úteis do Docker

- **Iniciar serviços em segundo plano:**
  ```bash
  docker compose up -d
  ```

- **Reconstruir imagens e iniciar (útil após alterações no código):**
  ```bash
  docker compose up -d --build
  ```

- **Visualizar logs em tempo real:**
  ```bash
  docker compose logs -f
  ```

- **Parar todos os containers:**
  ```bash
  docker compose down
  ```

