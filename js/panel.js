import { clientes } from './clientes.js'
import { produtos } from './produtos.js'

window.onload = () => {
  let contador = 0
  let elementClicked = false

  let btnCliente = document.querySelector('#link-cliente')
  let btnProduto = document.querySelector('#link-produto')
  let btnPedido = document.querySelector('#link-pedido')

  let janelaCliente = document.getElementById('clientes')
  let janelaProduto = document.getElementById('produtos')
  let janelaPedido = document.getElementById('pedidos')

  let btnFecharJanelaCli = document.querySelector('#fechar-cli')
  let btnFecharJanelaProduto = document.querySelector('#fechar-pro')
  let btnFecharJanelaPedido = document.querySelector('#fechar-pedido')

  //JANELA PRODUTO
  let codigoProd = document.getElementById('codigo-prod')
  let descricaoProd = document.getElementById('descricao-prod')
  let precoProd = document.getElementById('preco-prod')
  let qtdEstoqueProd = document.getElementById('qtd-prod')
  let btnNovoProd = document.querySelector('.btn-novo.produto')
  let btnSalvarProd = document.querySelector('.btn-salvar.produto')

  //JANELA CLIENTE
  let codigo = document.getElementById('codigo')
  let nome = document.getElementById('nome')
  let dataCadastro = document.getElementById('dataCadastro')
  let btnNovoCli = document.querySelector('.btn-novo.clientes')
  let btnSalvarCli = document.querySelector('.btn-salvar.cliente')

  //JANELA PEDIDOS
  let numItem = document.getElementById('cod-item')
  let nomeItens = document.getElementById('nome-item')
  let precoItens = document.getElementById('preco-item')
  let qtdItens = document.getElementById('qtd-item')
  let btnLancarPedido = document.getElementById('lancar-pedido')
  let corpoTabela = document.querySelector('#corpo')
  let somatorioTotal = document.getElementById('total')
  let itensAdicionadosAoPedido = []
  let subTotais = []

  /*---------*/

  let abrirJanela = (botao, janela) => {
    botao.addEventListener('click', () => {
      contador = 0
      janelaCliente.style.display = 'none'
      janelaProduto.style.display = 'none'
      janelaPedido.style.display = 'none'

      if (janela == janelaCliente) {
        listarCliente(contador)
      }

      if (janela == janelaProduto) {
        listarProduto(contador)
      }

      janela.style.display = 'block'
    })
  }

  let fecharJanela = (botao, janela) => {
    botao.addEventListener('click', () => {
      janela.style.display = 'none'
    })
  }

  /*----TELA CLIENTES-----*/

  let popularCamposClientes = () => {
    let btnAnterior = document.querySelector('.anterior')
    let btnProximo = document.querySelector('.proximo')

    btnAnterior.addEventListener('click', () => {
      if (contador == 0) {
        alert('Não é possível mudar de página')
      } else {
        --contador
        listarCliente(contador)
      }
    })

    btnProximo.addEventListener('click', () => {
      if (contador == clientes.length - 1) {
        alert('Não é possível mudar de página')
      } else {
        ++contador
        listarCliente(contador)
      }
    })
  }

  let listarCliente = i => {
    nome.value = clientes[i].nomeCliente
    codigo.value = clientes[i].codCliente
    dataCadastro.value = clientes[i].dataCadCli
  }

  let limparCampoCliente = () => {
    let data = new Date()
    btnNovoCli.addEventListener('click', () => {
      codigo.value = clientes.length + 1
      nome.value = ''
      dataCadastro.value = data.toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })

      elementClicked = true
    })
  }

  let criarNovoCliente = () => {
    let obj = {
      codCliente: codigo.value,
      nomeCliente: nome.value,
      dataCadCli: dataCadastro.value
    }
    clientes.push(obj)
  }

  let salvarNovoCliente = () => {
    btnSalvarCli.addEventListener('click', () => {
      if (elementClicked) {
        criarNovoCliente()
        alert('Novo Cliente Cadastrado com sucesso!')
        contador = 0
        listarCliente(0)
        elementClicked = false
      } else {
        alert('Clique em "NOVO" Para Inserir um Novo Registro')
      }
    })
  }

  /*-----TELA PRODUTOS----*/

  let popularCamposProduto = () => {
    let btnAnterior = document.querySelector('.prodAnterior')
    let btnProximo = document.querySelector('.proximoProd')

    listarProduto(0)

    btnAnterior.addEventListener('click', () => {
      if (contador == 0) {
        alert('Não é possível mudar de página')
      } else {
        --contador
        listarProduto(contador)
      }
    })

    btnProximo.addEventListener('click', () => {
      if (contador == produtos.length - 1) {
        alert('Não é possível mudar de página')
      } else {
        ++contador
        listarProduto(contador)
      }
    })
  }

  let limparCampoProduto = () => {
    btnNovoProd.addEventListener('click', () => {
      codigoProd.value = produtos.length + 1
      descricaoProd.value = ''
      precoProd.value = ''
      qtdEstoqueProd.value = ''
      elementClicked = true
    })
  }

  let salvarNovoProduto = () => {
    btnSalvarProd.addEventListener('click', () => {
      if (elementClicked) {
        criarNovoProduto()
        alert('Novo Produto Cadastrado com sucesso!')
        contador = 0
        listarProduto(0)
        elementClicked = false
      } else {
        alert('Clique em "NOVO" Para Inserir um Novo Registro')
      }
    })
  }

  let criarNovoProduto = () => {
    let obj = {
      codProduto: codigoProd.value,
      descProduto: descricaoProd.value,
      precoProduto: parseFloat(precoProd.value),
      qtdEstoqueProd: parseInt(qtdEstoqueProd.value)
    }
    produtos.push(obj)
  }

  let listarProduto = i => {
    descricaoProd.value = produtos[i].descProduto
    codigoProd.value = produtos[i].codProduto
    precoProd.value = produtos[i].precoProduto
    qtdEstoqueProd.value = produtos[i].qtdEstoqueProd
  }

  /*----TELA DE PEDIDOS----*/

  let popularCampoClienteEmPedidos = () => {
    let codigoCli = document.getElementById('codigo-cli')
    let campoNome = document.getElementById('pedido-cli')

    codigoCli.addEventListener('focusout', () => {
      if (!clientes.some(e => e['codCliente'] == codigoCli.value)) {
        alert('O código de Cliente é Inválido! Digite um novo valor')
        campoNome.value = ''
        numItem.disabled = true
        qtdItens.disabled = true
        btnLancarPedido.disabled = true
        return false
      } else {
        numItem.disabled = false
        qtdItens.disabled = false
        btnLancarPedido.disabled = false
      }

      for (let cliente of clientes) {
        if (cliente.codCliente == codigoCli.value) {
          console.log(cliente.nomeCliente)
          campoNome.value = cliente.nomeCliente
        }
      }
    })
  }

  let criarPedido = () => {
    let qtProdutoEmEstoque = 0

    numItem.addEventListener('focusout', () => {
      for (let produto of produtos) {
        if (produto.codProduto == numItem.value) {
          nomeItens.value = produto.descProduto
          precoItens.value = produto.precoProduto
          qtProdutoEmEstoque = produto.qtdEstoqueProd
        }
      }
    })

    btnLancarPedido.addEventListener('click', () => {
      if (!produtos.some(e => e['codProduto'] == numItem.value)) {
        alert('O código desse produto é Inválido!')
        return false
      }

      if (itensAdicionadosAoPedido.includes(numItem.value)) {
        alert('Esse item já foi adicionado ao Pedido!')
        return false
      }

      if (qtdItens.value > qtProdutoEmEstoque) {
        alert('Quantidade do Pedido superior a que se encontra em estoque!')
        return false
      }

      let subTotal = (
        parseFloat(qtdItens.value) * parseFloat(precoItens.value)
      ).toFixed(2)

      subTotais.push(subTotal)

      totalizarPedido(subTotais)

      let novaLinha = document.createElement('tr')

      criarColuna(novaLinha, numItem.value)
      criarColuna(novaLinha, nomeItens.value)
      criarColuna(novaLinha, precoItens.value)
      criarColuna(novaLinha, qtdItens.value)
      criarColuna(novaLinha, subTotal)

      corpoTabela.appendChild(novaLinha)

      itensAdicionadosAoPedido.push(numItem.value)
    })
  }

  let totalizarPedido = subTotais => {
    let soma = 0

    subTotais.forEach(elemento => {
      soma += parseFloat(elemento)
    })

    somatorioTotal.innerText = `R$${soma.toFixed(2)}`
    somatorioTotal.style.display = 'block'
  }

  let criarColuna = (linha, valor) => {
    let novaColuna = document.createElement('td')
    novaColuna.innerText = valor
    linha.appendChild(novaColuna)
  }

  /*---CHAMADA DE FUNÇÕES------*/

  popularCamposClientes()

  popularCamposProduto()

  popularCampoClienteEmPedidos()

  criarPedido()

  abrirJanela(btnCliente, janelaCliente)

  abrirJanela(btnProduto, janelaProduto)

  abrirJanela(btnPedido, janelaPedido)

  fecharJanela(btnFecharJanelaCli, janelaCliente)

  fecharJanela(btnFecharJanelaProduto, janelaProduto)

  fecharJanela(btnFecharJanelaPedido, janelaPedido)

  limparCampoProduto()

  limparCampoCliente()

  salvarNovoProduto()

  salvarNovoCliente()
}
