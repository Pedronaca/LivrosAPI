const API_URL = "http://localhost:8000/livros";

const bookForm = document.getElementById("book-form");
const booksGrid = document.getElementById("books-grid");

document.addEventListener("DOMContentLoaded", carregarLivros);

// Busca os livros na API e mostra um cartão para cada livro.
async function carregarLivros() {
  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status}`);
    }

    const livros = await resposta.json();
    booksGrid.replaceChildren();

    if (livros.length === 0) {
      booksGrid.textContent = "Nenhum livro cadastrado ainda.";
      return;
    }

    for (const livro of livros) {
      booksGrid.appendChild(criarCard(livro));
    }
  } catch (erro) {
    console.error("Erro ao carregar livros:", erro);
    booksGrid.textContent = "Não foi possível carregar os livros.";
  }
}

// Monta o cartão e associa os botões ao livro correspondente.
function criarCard(livro) {
  const card = document.createElement("div");
  card.className = "book-card";

  card.innerHTML = `
    <div>
      <h3></h3>
      <p class="author"></p>
      <p class="details"></p>
      <span class="badge"></span>
    </div>
    <div class="card-actions">
      <button type="button" class="btn-toggle"></button>
      <button type="button" class="btn-delete">Excluir</button>
    </div>
  `;

  card.querySelector("h3").textContent = livro.titulo;
  card.querySelector(".author").textContent = `por ${livro.autor}`;

  const genero = livro.genero || "Gênero não informado";
  const ano = livro.ano ?? "Sem ano";
  card.querySelector(".details").textContent = `${genero} • ${ano}`;

  const badge = card.querySelector(".badge");
  badge.textContent = livro.lido ? "Lido" : "Não lido";
  badge.classList.add(livro.lido ? "badge-read" : "badge-unread");

  const botaoStatus = card.querySelector(".btn-toggle");
  botaoStatus.textContent = livro.lido ? "Desmarcar lido" : "Marcar como lido";
  botaoStatus.addEventListener("click", () => alternarStatus(livro));

  const botaoExcluir = card.querySelector(".btn-delete");
  botaoExcluir.addEventListener("click", () => deletarLivro(livro.id));

  return card;
}

// Cadastra um livro quando o formulário é enviado.
bookForm.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const ano = document.getElementById("ano").value;
  const novoLivro = {
    titulo: document.getElementById("titulo").value.trim(),
    autor: document.getElementById("autor").value.trim(),
    genero: document.getElementById("genero").value.trim() || null,
    ano: ano === "" ? null : Number(ano),
    lido: document.getElementById("lido").checked
  };

  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoLivro)
    });

    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status}`);
    }

    bookForm.reset();
    await carregarLivros();
  } catch (erro) {
    console.error("Erro ao cadastrar livro:", erro);
    alert("Não foi possível cadastrar o livro.");
  }
});

// Inverte o status de leitura e mantém os demais dados do livro.
async function alternarStatus(livro) {
  const livroAtualizado = {
    titulo: livro.titulo,
    autor: livro.autor,
    genero: livro.genero,
    ano: livro.ano,
    lido: !livro.lido
  };

  try {
    const resposta = await fetch(`${API_URL}/${livro.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(livroAtualizado)
    });

    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status}`);
    }

    await carregarLivros();
  } catch (erro) {
    console.error("Erro ao atualizar status:", erro);
    alert("Não foi possível atualizar o status de leitura.");
  }
}

// Exclui o livro pelo ID e atualiza a lista.
async function deletarLivro(id) {
  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status}`);
    }

    await carregarLivros();
  } catch (erro) {
    console.error("Erro ao excluir livro:", erro);
    alert("Não foi possível excluir o livro.");
  }
}