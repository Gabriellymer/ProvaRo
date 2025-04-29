document.addEventListener('DOMContentLoaded', load);

const botao = document.getElementById('botao');

botao.addEventListener("click", async function (event) {
  event.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;
  const ano = document.getElementById('ano').value;
  const genero = document.getElementById('Genero').value;
  const sinopse = document.getElementById('sinopse').value;

  try {
    const res = await fetch('http://192.168.1.5:3000/livros', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: titulo,
        autor: autor,
        ano_publicacao: ano,
        genero: genero,
        resumo: sinopse
      })
    });

    alert("CADASTRADO COM SUCESSO!")
    load();

  } catch (error) {
    console.error("Erro ao cadastrar", error);
    alert('erro')
  }
});

async function load() {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  try {
      const response = await fetch('http://192.168.1.5:3000/livrosCad'); 
      const livros = await response.json();

      if (!Array.isArray(livros) || livros.length === 0) {
          container.innerHTML = "<p style='color:white;text-align:center;'>Nenhum livro cadastrado </p>";
          return;
      }

      livros.forEach(livro => {
          const card = document.createElement("div");
          card.classList.add("livro-card");

          card.innerHTML = `
              <h3>${livro.titulo}</h3>
              <p><strong>Autor:</strong> ${livro.autor}</p>
              <p><strong>Ano:</strong> ${livro.ano}</p>
              <p><strong>Genero:</strong> ${livro.genero}</p>
              <p><strong>Sinopse:</strong> ${livro.sinopse}</p>
              <p>Data de Inserção: ${new Date(livro.datainserida).toLocaleString()}</p>
          `;

          container.appendChild(card);
      });
  } catch (error) {
      console.error("Erro ao carregar livros:", error);
      container.innerHTML = "<p>Erro ao carregar livros.</p>";
  }
}
