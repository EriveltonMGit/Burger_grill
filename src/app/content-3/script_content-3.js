
// FUNÇAO PARA INCREMENTAR E DECREMENTAR
function decrement(elementId) {
  var valorP = document.getElementById(elementId);

  if (valorP) {
    var valorAtual = parseInt(valorP.innerText, 10);
    var novoValor = valorAtual - 1;

    // Verifica se o novo valor é menor que 0
    if (novoValor < 0) {
      novoValor = 0; // Ajusta o valor para 0
      alert('O valor não pode ser menor que 0!');
    }

    // Atualiza o valor no DOM
    valorP.innerText = novoValor;

    console.log("Valor final após ajuste: " + valorP.innerText);
  } else {
    console.error("Elemento com ID '" + elementId + "' não encontrado.");
  }
}



//FUNÇAO incrementar
function increment(elementId) {
  var valorP = document.getElementById(elementId);

  if (valorP) {
    var novoValor = parseInt(valorP.innerText, 10);
    valorP.innerText = novoValor + 1;


    var carrinho = document.getElementById('carrinho-produtos');

    if (carrinho && (carrinho.style.display === 'none' || carrinho.style.display === '')) {
      carrinho.style.display = 'block';
    }
  } else {
    console.error("Element with ID '" + elementId + "' not found.");
  }
}



// FUNÇÃO PARA EXIBIR MENSAGEM
function exibirMensagem() {
  var mensagem = document.getElementById("mensagem");
  mensagem.style.display = "block";
  mensagem.style.marginTop = "20vh";
}

function esconderMensagem() {
  var mensagem = document.getElementById("mensagem");
  mensagem.style.display = "none";
}


function adicionarAoCarrinho(elementId, nomeProduto, valorProduto) {
  var mensagem = document.getElementById('mensagem');
  var carrinho = document.getElementById('buttonFlutuanteCarrinho');

  let valorProdutoFloat = parseFloat(valorProduto);

  if (isNaN(valorProdutoFloat) || valorProdutoFloat <= 0) {
    alert('Por favor, adicione um valor válido maior que zero!');
    return;
  }

  // Verifica se há produtos no carrinho no localStorage
  let produtosNoCarrinho = JSON.parse(localStorage.getItem('produtosNoCarrinho')) || [];

  // Recupera todos os elementos de quantidade de produtos
  var quantidadeElementos = document.querySelectorAll('[id^="quantidade-"]');
  var quantidadeProdutos = [];

  // Itera sobre os elementos para obter as quantidades
  quantidadeElementos.forEach(function (elemento) {
    quantidadeProdutos.push(parseInt(elemento.innerText));
  });

  // Verifica se a quantidade de ambos os produtos é válida
  if (quantidadeProdutos.every(function (quantidade) {
    return quantidade <= 0;
  })) {
    alert('Por favor, adicione uma quantidade válida maior que zero!');
    return;
  }

  // Adiciona os produtos ao carrinho
  quantidadeProdutos.forEach(function (quantidade, index) {
    if (quantidade > 0) {
      let produto = {
        id: produtosNoCarrinho.length + 1, // Adiciona um novo ID único
        nome: `${nomeProduto} - Produto ${index + 1}`,
        valor: (valorProdutoFloat * quantidade).toFixed(2),
        quantidade: quantidade
      };
      produtosNoCarrinho.push(produto);
    }
  });

  localStorage.setItem('produtosNoCarrinho', JSON.stringify(produtosNoCarrinho));

  // Atualiza o carrinho e a quantidade de produtos no HTML
  atualizarCarrinhoNoHTML(produtosNoCarrinho);
  document.getElementById('quantidadeProdutos').textContent = produtosNoCarrinho.length;

  console.log('Produtos adicionados ao carrinho!');

  mensagem.style.display = 'block';

  setTimeout(function () {
    exibirMensagem();
  }, 3000);

  setTimeout(function () {
    esconderMensagem();
  }, 6000);

  if (carrinho.style.display === 'none' || carrinho.style.display === '') {
    carrinho.style.display = 'flex';
    carrinho.style.alignItems = 'center';
    carrinho.style.justifyContent = 'center';
  }

  resetarContadores();
}

function resetarContadores() {
  // Obtém todos os elementos que têm a classe 'inputValor'
  let elementosInputValor = document.querySelectorAll('.inputValor');

  // Itera sobre todos os elementos e define o valor do contador para 0
  elementosInputValor.forEach(function (elemento) {
    elemento.querySelector('p').innerText = '0';
  });
}

function atualizarCarrinhoNoHTML(produtos) {
  let carrinho = document.getElementById('carrinho-produtos');
  carrinho.innerHTML = '';

  let total = 0; // Inicializa o total como zero

  for (const produto of produtos) {
    let item = document.createElement('div');
    item.style.border = '1px solid black';
    item.style.width = '100%';
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.justifyContent = 'space-between';
    item.style.position= 'relative';
    item.style.overflowY= 'scroll';
    item.style.margin = '0 auto';
    item.style.gap = '2vw';
    item.style.height = '25%';
    item.style.fontSize = '1vw';
    item.style.marginTop = '1.5vh';
    item.style.color = 'black';
    item.style.fontSize = '2.5vw';
    item.style.flexWrap = '2vw';
    item.style.borderRadius = '5px';

    let nomeSpan = document.createElement('span');
    nomeSpan.textContent = produto.nome;

    let quantidadeSpan = document.createElement('span');
    quantidadeSpan.textContent = `Qtd: ${produto.quantidade}`;
    
    let valorSpan = document.createElement('span');
    valorSpan.textContent = `R$ ${(produto.valor / produto.quantidade).toFixed(2)} cada`;
    
    let valorTotalSpan = document.createElement('span');
    valorTotalSpan.textContent = `Total: R$ ${produto.valor}`;
    
    // Calcula o total somando o valor do produto
    total += parseFloat(produto.valor);

    let botaoRemover = document.createElement('button');
    botaoRemover.textContent = 'Remover';
    botaoRemover.style.borderRadius = '10px';
    botaoRemover.style.boxShadow = '-7px 7px 1rem black';
    botaoRemover.style.padding = '0.5rem';
    botaoRemover.style.backgroundColor = 'red';
    botaoRemover.style.color = 'white';
    botaoRemover.style.border = 'none';
    botaoRemover.style.fontSize = '2vw';
    botaoRemover.style.position = 'absolute';
    botaoRemover.style.width = '40%';
    botaoRemover.style.bottom = '0px';
    botaoRemover.style.right = '0px';

    botaoRemover.addEventListener('click', function () {
      removerDoCarrinho(produto.id);
    });

    item.appendChild(nomeSpan);
    item.appendChild(quantidadeSpan);
    item.appendChild(valorSpan);
    item.appendChild(valorTotalSpan);
    item.appendChild(botaoRemover);

    carrinho.appendChild(item);
  }

  // Atualiza o valor total na seção de preço
  let precoTotal = document.querySelector('#preco h3');
  precoTotal.textContent = `R$ ${total.toFixed(2)}`;
}


// FUNÇÃO PARA REMOVER O PRODUTO DA LISTA DO CARRINHO
function removerDoCarrinho(idProduto) {
  let produtosNoCarrinho = JSON.parse(localStorage.getItem('produtosNoCarrinho')) || [];

  // Encontrar o índice do produto no carrinho com base no id
  const index = produtosNoCarrinho.findIndex(produto => produto.id === idProduto);

  if (index !== -1) {
    // Verificar se o valor do produto é zero
    if (parseInt(produtosNoCarrinho[index].valor) === 0) {
      // Se o valor for zero, remover o produto do carrinho e do localStorage
      produtosNoCarrinho.splice(index, 1);
      localStorage.setItem('produtosNoCarrinho', JSON.stringify(produtosNoCarrinho));
    } else {
      // Se o valor não for zero, remover apenas do carrinho
      produtosNoCarrinho.splice(index, 1);
      localStorage.setItem('produtosNoCarrinho', JSON.stringify(produtosNoCarrinho));
    }

    // Atualizar o carrinho no HTML
    atualizarCarrinhoNoHTML(produtosNoCarrinho);

    // Atualizar a quantidade de produtos no elemento HTML
    let quantidadeElement = document.getElementById('quantidadeProdutos');
    quantidadeElement.textContent = produtosNoCarrinho.length;
  }
}




// Função para carregar o carrinho ao carregar a página
function carregarCarrinho() {
  // Recupera produtos do localStorage
  let produtosNoCarrinho = JSON.parse(localStorage.getItem('produtosNoCarrinho')) || [];

  // Atualiza o carrinho no HTML
  atualizarCarrinhoNoHTML(produtosNoCarrinho);

  // Atualiza a quantidade de produtos no elemento HTML
  document.getElementById('quantidadeProdutos').textContent = produtosNoCarrinho.length;
}

// Chama a função para carregar o carrinho ao carregar a página
window.addEventListener('load', carregarCarrinho);





// FUNÇAO PARA ABRIR O CARRINHO PLEO BUTTON FLUTUANTE
function abrirCarrinhoFlutuante() {
  
 
  // Atualiza os produtos no carrinho
  let produtosNoCarrinho = JSON.parse(localStorage.getItem('produtosNoCarrinho')) || [];
  atualizarCarrinhoNoHTML(produtosNoCarrinho);

  // Usa o jQuery para abrir o modal
  $('#myModal').modal('show');
}

function closeCarrinho() {
  $('#myModal').modal('hide'); // Fecha o modal utilizando o método Bootstrap
}








function abrirCard() {
  const verMais = document.getElementById('verMais');
  const cardEscondido = document.getElementById('cardEscondido');

  // Verifica se o texto é "verMais" e alterna para "voltar", ou vice-versa
  if (verMais.style.display === 'block' || verMais.style.display === '') {
    verMais.style.display = 'none'
  }

  // Alterna a exibição do card escondido
  cardEscondido.style.display = (cardEscondido.style.display === 'none' || cardEscondido.style.display === '') ?
    'flex' : 'none';

  // Define o estilo do card escondido
  if (cardEscondido.style.display === 'flex') {
    cardEscondido.style.justifyContent = 'space-around';
    cardEscondido.style.flexDirection = 'row';
  }
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

