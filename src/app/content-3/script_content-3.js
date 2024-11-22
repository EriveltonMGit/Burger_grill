// Função para incrementar a quantidade de um produto
function increment(elementId) {
  const element = document.getElementById(elementId);

  if (element) {
    let currentValue = parseInt(element.innerText, 10) || 0;
    element.innerText = currentValue + 1;

    const carrinho = document.getElementById('carrinho-produtos');
    if (carrinho && (carrinho.style.display === 'none' || carrinho.style.display === '')) {
      carrinho.style.display = 'block';
    }
  } else {
    console.error(`Elemento com ID '${elementId}' não encontrado.`);
  }
}

// Função para decrementar a quantidade de um produto
function decrement(elementId) {
  const element = document.getElementById(elementId);

  if (element) {
    let currentValue = parseInt(element.innerText, 10) || 0;
    let newValue = currentValue > 0 ? currentValue - 1 : 0;

    if (newValue === 0 && currentValue > 0) {
      alert('O valor não pode ser menor que 0!');
    }

    element.innerText = newValue;
  } else {
    console.error(`Elemento com ID '${elementId}' não encontrado.`);
  }
}

// Função para exibir uma mensagem temporária
function toggleMessage(show = true) {
  const message = document.getElementById("mensagem");
  if (message) {
    message.style.display = show ? "block" : "none";
    message.style.marginTop = show ? "20vh" : "0";
  }
}

// Função para adicionar produtos ao carrinho
function adicionarAoCarrinho(elementId, nomeProduto, valorProduto) {
  const valorProdutoFloat = parseFloat(valorProduto);

  if (isNaN(valorProdutoFloat) || valorProdutoFloat <= 0) {
    alert('Por favor, adicione um valor válido maior que zero!');
    return;
  }

  let produtosNoCarrinho = JSON.parse(localStorage.getItem('produtosNoCarrinho')) || [];

  const quantidadeElementos = document.querySelectorAll('[id^="quantidade-"]');
  const quantidadeProdutos = Array.from(quantidadeElementos).map(el => parseInt(el.innerText, 10) || 0);

  if (quantidadeProdutos.every(qtd => qtd <= 0)) {
    alert('Adicione uma quantidade válida maior que zero!');
    return;
  }

  quantidadeProdutos.forEach((quantidade, index) => {
    if (quantidade > 0) {
      produtosNoCarrinho.push({
        id: produtosNoCarrinho.length + 1,
        nome: `${nomeProduto} - Produto ${index + 1}`,
        valor: (valorProdutoFloat * quantidade).toFixed(2),
        quantidade
      });
    }
  });

  localStorage.setItem('produtosNoCarrinho', JSON.stringify(produtosNoCarrinho));
  atualizarCarrinhoNoHTML(produtosNoCarrinho);

  document.getElementById('quantidadeProdutos').textContent = produtosNoCarrinho.length;
  toggleMessage(true);

  setTimeout(() => toggleMessage(false), 3000);
  resetarContadores();
}

// Função para resetar os contadores de produtos
function resetarContadores() {
  document.querySelectorAll('.inputValor p').forEach(el => el.innerText = '0');
}

// Função para atualizar o carrinho no HTML
function atualizarCarrinhoNoHTML(produtos) {
  const carrinho = document.getElementById('carrinho-produtos');
  carrinho.innerHTML = '';
  let total = 0;

  produtos.forEach(produto => {
    total += parseFloat(produto.valor);

    const item = document.createElement('div');
    item.classList.add('carrinho-item');

    item.innerHTML = `
      <span>${produto.nome}</span>
      <span>Qtd: ${produto.quantidade}</span>
      <span>R$ ${(produto.valor / produto.quantidade).toFixed(2)} cada</span>
      <span>Total: R$ ${produto.valor}</span>
      <button class="remover" onclick="removerDoCarrinho(${produto.id})">Remover</button>
    `;

    carrinho.appendChild(item);
  });

  document.querySelector('#preco h3').textContent = `R$ ${total.toFixed(2)}`;
}

// Função para remover produto do carrinho
function removerDoCarrinho(idProduto) {
  let produtosNoCarrinho = JSON.parse(localStorage.getItem('produtosNoCarrinho')) || [];
  produtosNoCarrinho = produtosNoCarrinho.filter(produto => produto.id !== idProduto);

  localStorage.setItem('produtosNoCarrinho', JSON.stringify(produtosNoCarrinho));
  atualizarCarrinhoNoHTML(produtosNoCarrinho);

  document.getElementById('quantidadeProdutos').textContent = produtosNoCarrinho.length;
}

// Função para carregar o carrinho ao carregar a página
function carregarCarrinho() {
  const produtosNoCarrinho = JSON.parse(localStorage.getItem('produtosNoCarrinho')) || [];
  atualizarCarrinhoNoHTML(produtosNoCarrinho);
  document.getElementById('quantidadeProdutos').textContent = produtosNoCarrinho.length;
}

// Inicializa o carrinho ao carregar a página
window.addEventListener('load', carregarCarrinho);

// Função para abrir o modal do carrinho
function abrirCarrinhoFlutuante() {
  const produtosNoCarrinho = JSON.parse(localStorage.getItem('produtosNoCarrinho')) || [];
  atualizarCarrinhoNoHTML(produtosNoCarrinho);
  $('#myModal').modal('show');
}

// Função para fechar o modal do carrinho
function closeCarrinho() {
  $('#myModal').modal('hide');
}

// Lógica para mostrar os cards de hambúrguer
function cardHamburguer() {
  document.getElementById('cards-pizza').style.display = 'none';
  document.getElementById('card-churrasco').style.display = 'none';
  document.getElementById('card-bebidas').style.display = 'none';
  document.getElementById('card-sobremesas').style.display = 'none';
  var gifHamburguer = document.getElementById(`gif-hamburguer`)
  var cardsHamburguer = document.getElementById(`cards`)
  cardsHamburguer.style.display = 'flex'
  cardsHamburguer.style.width = '90%'
  cardsHamburguer.style.justifyContent = 'space-around'
  cardsHamburguer.style.flexWrap = ' wrap'
  gifHamburguer.style.display = 'block'
}

// Lógica para mostrar os cards de pizza
function cardPizza() {
  document.getElementById(`cards`).style.display = 'none'
  document.getElementById('card-churrasco').style.display = 'none';
  document.getElementById('card-bebidas').style.display = 'none';
  document.getElementById('card-sobremesas').style.display = 'none';
  var gifHamburguer = document.getElementById(`gif-hamburguer`)
  var cardsPizzza = document.getElementById('cards-pizza')
  cardsPizzza.style.display = 'flex'
  cardsPizzza.style.width = '90%'
  cardsPizzza.style.justifyContent = 'space-around'
  cardsPizzza.style.flexWrap = ' wrap'
  gifHamburguer.style.display = 'none'
}

// Lógica para mostrar os cards de churrasco
function cardChurrasco() {
  document.getElementById(`cards`).style.display = 'none'
  document.getElementById('cards-pizza').style.display = 'none';
  document.getElementById('card-bebidas').style.display = 'none';
  document.getElementById('card-sobremesas').style.display = 'none';
  var cardChurrasco = document.getElementById('card-churrasco')
  cardChurrasco.style.display = 'flex'
  cardChurrasco.style.width = '90%'
  cardChurrasco.style.justifyContent = 'space-around'
  cardChurrasco.style.flexWrap = ' wrap'
}

// Lógica para mostrar os cards de bebidas
function cardBebidas() {
  document.getElementById(`cards`).style.display = 'none'
  document.getElementById('cards-pizza').style.display = 'none';
  document.getElementById('card-churrasco').style.display = 'none';
  document.getElementById('card-sobremesas').style.display = 'none';
  var cardBebidas = document.getElementById('card-bebidas')
  cardBebidas.style.display = 'flex'
  cardBebidas.style.width = '90%'
  cardBebidas.style.justifyContent = 'space-around'
  cardBebidas.style.flexWrap = ' wrap'
}

// Lógica para mostrar os cards de sobremesas
function cardSobremesas() {
  document.getElementById(`cards`).style.display = 'none'
  document.getElementById('cards-pizza').style.display = 'none';
  document.getElementById('card-churrasco').style.display = 'none';
  document.getElementById('card-bebidas').style.display = 'none';
  var cardSobremesas = document.getElementById('card-sobremesas')
  cardSobremesas.style.display = 'flex'
  cardSobremesas.style.width = '90%'
  cardSobremesas.style.justifyContent = 'space-around'
  cardSobremesas.style.flexWrap = ' wrap'
}

