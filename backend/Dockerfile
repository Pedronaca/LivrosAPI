FROM python:3.11-slim

# Evita que o Python gere arquivos .pyc e força o log direto no terminal
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Instala dependências do sistema necessárias para o psycopg2
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Instala bibliotecas Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o código da API
COPY . .

# Expõe a porta do FastAPI
EXPOSE 8000

# Inicializa o Uvicorn apontando para o app em main.py
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]