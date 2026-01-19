let produtos = [];

function abrirFormulario() {
    document.getElementById("modal-produto").style.display = "block";
}

function fecharFormulario() {
    document.getElementById("modal-produto").style.display = "none";
}

function salvarProduto() {
    const produto = {
        nome: document.getElementById("nome-produto").value,
        preco: Number(document.getElementById("preco-produto").value),
        categoria: document.getElementById("categoria-produto").value.toLowerCase(),
        avaliacao: Number(document.getElementById("avaliacao-produto").value),
        imagem: document.getElementById("imagem-produto").value
    };

    produtos.push(produto);
    fecharFormulario();
    limparFormulario();
    mostrarProdutos(produtos);
}

function limparFormulario() {
    document.querySelectorAll("#modal-produto input").forEach(input => input.value = "");
}

function mostrarProdutos(lista) {
    const container = document.getElementById("lista-produtos");
    container.innerHTML = "";

    lista.forEach((produto, index) => {
        container.innerHTML += `
            <div class="produto">
                <img src="${produto.imagem}">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco}</p>
                <p>Categoria: ${produto.categoria}</p>
                <p>Avaliação: ${produto.avaliacao}</p>
                <button onclick="removerProduto(${index})">Remover</button>
            </div>
        `;
    });
}

function removerProduto(indice) {
    produtos.splice(indice, 1);
    mostrarProdutos(produtos);
}

function filtrarProdutos() {
    const texto = document.getElementById("barra-pesquisa").value.toLowerCase();       /*pega o valor dq esta sendo escrito*/      /* toLowerCase()  altera para minuscula*/
    const categoria = document.getElementById("filtro-categoria").value;           
    const preco = document.getElementById("filtro-preco").value;
    const avaliacao = document.getElementById("filtro-avaliacao").value;

    let filtrados = produtos.filter(produto => {
        let condicao = produto.nome.toLowerCase().includes(texto);

        if (categoria) condicao &= produto.categoria === categoria;
        if (avaliacao) condicao &= produto.avaliacao >= avaliacao;

        if (preco === "baixo") condicao &= produto.preco <= 100;
        if (preco === "medio") condicao &= produto.preco > 100 && produto.preco <= 500;
        if (preco === "alto") condicao &= produto.preco > 500;

        return condicao;
    });

    mostrarProdutos(filtrados);
}
