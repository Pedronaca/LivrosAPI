const API_URL = "http://localhost:8000/livros";

const bookForm = document.getElementById("book-form");
const booksGrid = document.getElementById("books-grid");
let listaLivros = [];

// Carrega livros ao abrir a página
document.addEventListener("DOMContentLoaded", carregarLivros);

// Buscar e exibir livros
async function carregarLivros() {
  try {
    const response = await fetch(API_URL);
    ListaLivros = await response.json();
    listaLivros = await response.json();

    booksGrid.innerHTML = "";

    if (livros.length === 0) {
    if (listaLivros.length === 0) {
      booksGrid.innerHTML = "<p>Nenhum livro cadastrado ainda.</p>";
      return;
    }

    listaLivros.forEach((livro) => {
      const card = document.createElement("div");
      card.className = "book-card";
      card.innerHTML = `
        <div>
          <h3>${livro.titulo}</h3>
          <p class="author">por ${livro.autor}</p>
          <p class="details">
            ${livro.genero || "Gênero não informado"} • ${livro.ano || "Sem ano"}
          </p>
          <span class="badge ${livro.lido ? 'badge-read' : 'badge-unread'}">
            ${livro.lido ? "Lido" : "Não lido"}
          </span>
        </div>
        <button class="btn-delete" onclick="deletarLivro(${livro.id})">Excluir</button>
        <div class="card-actions">
          <button class="btn-toggle" onclick="alternarStatus(${livro.id})">
            ${livro.lido ? "Desmarcar lido" : "Marcar como lido"}
          </button>
          <button class="btn-delete" onclick="deletarLivro(${livro.id})">Excluir</button>
        </div>
      `;
      booksGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar livros:", error);
    booksGrid.innerHTML = "<p>Erro ao conectar com a API.</p>";
  }
}

// Cadastrar novo livro
bookForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const novoLivro = {
    titulo: document.getElementById("titulo").value,
    autor: document.getElementById("autor").value,
    genero: document.getElementById("genero").value || null,
    ano: parseInt(document.getElementById("ano").value) || null,
    lido: document.getElementById("lido").checked
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoLivro)
    });

    if (response.ok) {
      bookForm.reset();
      carregarLivros();
    }
  } catch (error) {
    console.error("Erro ao salvar livro:", error);
  }
});

// Deletar livro
async function deletarLivro(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      carregarLivros();
    }
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
  }
}

// Atualizar status de leitura do livro
async function AlternarStatus(id) {
async function alternarStatus(id) {
  const livro = listaLivros.find((livro) => livro.id === id);
  if (!livro) return;

  const livroAtualizado = { 
    titulo: livro.titulo,
    autor: livro.autor,
    genero: livro.genero,
    ano: livro.ano,
    lido: !livro.lido
  };//inverte o status atual
  };

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(livroAtualizado)
    });

    if (response.ok) {
      carregarLivros();
    } 
  }catch (error) {
  } catch (error) {
    console.error("Erro ao atualizar status do livro:", error);
  }
}