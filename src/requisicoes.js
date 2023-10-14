import Sequelize from "sequelize";
import bd from "./bd.js";
import inquirer from "inquirer";

const cliente = bd.define("controles", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  nomeProduto: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dataEntrega: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantidade: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  concluida: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

function calcularValorTotal(quantidade) {
  return quantidade * 2;
}

async function pedidos() {
  cliente.sync();

  const perguntas = [
    {
      type: "list",
      name: "nomeProduto",
      message: "Escolha o produto:",
      choices: ["Canetas", "Caderno", "Borrachas"],
    },
    {
      type: "list",
      name: "dataEntrega",
      message: "Digite data de entrega requerida:",
      choices: ["1 MES", "3 MESES", "1 ANO"],
    },
    {
      type: "input",
      name: "quantidade",
      message: "Digite a quantidade requerida:",
    },
  ];

  const respostaQuantidade = await inquirer.prompt(perguntas);

  const quantidadeRequerida = parseFloat(respostaQuantidade.quantidade);

  const valorTotal = calcularValorTotal(quantidadeRequerida);

  console.log(`O valor total do pedido é: R$ ${valorTotal.toFixed(2)}`);

  const perguntaConfirmacao = {
    type: "confirm",
    name: "Confirmar",
    message: "Deseja confirmar o pedido?",
  };

  const respostaConfirmacao = await inquirer.prompt(perguntaConfirmacao);

  if (respostaConfirmacao.Confirmar && quantidadeRequerida < 100) {
    await cliente.create({
      nomeProduto: respostaQuantidade.nomeProduto,
      dataEntrega: respostaQuantidade.dataEntrega,
      quantidade: quantidadeRequerida,
    });

    console.log(
      "Pedido confirmado e dados inseridos no banco de dados com sucesso!"
    );
  } else {
    console.log("Pedido não confirmado, Ou materia prima Insuficientes, entre em contato com o suporte ");
  }
}

async function listarrequisicoes() {
  try {
    await bd.sync()
    const requisicoes = await cliente.findAll();

    if (requisicoes.length === 0) {
      console.log("Nenhuma requisição encontrada");
    } else {
      console.log("Lista de Requisições:");
      requisicoes.forEach((requisicao) => {
        console.log(`ID: ${requisicao.id}`);
        console.log(`Produto: ${requisicao.nomeProduto}`);
        console.log(`Data de Entrega: ${requisicao.dataEntrega}`);
        console.log(`Quantidade: ${requisicao.quantidade}`);
        console.log(`Concluida: ${requisicao.concluida}`);
        console.log("-----------------------");
      });
    }
  } catch (error) {
    console.error("Erro ao listar as requisições:", error);
  }
}

async function marcarComoConcluida(id) {
  try {
    await cliente.update({ concluida: true }, { where: { id } });
    console.log(`Pedido com ID ${id} marcado como concluído.`);
  } catch (error) {
    console.error("Erro ao marcar o pedido como concluído:", error);
  }
}

async function exibirMenuPrincipal() {
  const menu = [
    {
      type: "list",
      name: "choice",
      message: "Escolha uma opção:",
      choices: ["Nova requisição", "Listar as requisições", "Exit"],
    }];

    await inquirer.prompt(menu).then(async (answers) => {
      switch (answers.choice) {
        case "Nova requisição":
          await pedidos();
          break;
        case "Listar as requisições":
          await listarrequisicoes();
          await exibirMenuListarRequisicoes();
          break;
        case "Exit":
          console.log("Saindo do programa.");
          process.exit(0);
      }
    });
  }


async function exibirMenuListarRequisicoes() {
  let continuarPrograma = true;
  do {
    const perguntaContinuar = [
      {
        type: "confirm",
        name: "continuar",
        message: "Deseja marcar outro pedido como concluído?",
      }];
  
    const respostaContinuar = await inquirer.prompt(perguntaContinuar);
    continuarPrograma = respostaContinuar.continuar;
  
  } while (continuarPrograma);
}

export default { listarrequisicoes, pedidos, exibirMenuPrincipal };
