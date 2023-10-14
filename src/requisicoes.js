import Sequelize from "sequelize";
import bd from "./bd.js";
import inquirer from "inquirer";
const data = [
  {
    type: "list",
    name: "choice",
    message: "Escolha uma opção:",
    choices: ["1MES", "3MESES", "1ANO"],
  },
];
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
});

// Função para coletar dados do usuário e inserir no banco de dados
async function pedidos() {
  
    cliente.sync()
 
  const perguntas = [
    {
      type: "input",
      name: "nomeProduto",
      message: "Digite o nome do produto e confirme:",
    },
    {
      type: "input",
      name: "dataEntrega",
      message: "Digite data de entrega requerida:",
    },
    {
      type: "number",
      name: "quantidade",
      message: "Digite a quantidade requerida:",
    },
    {
      type: "confirm",
      name: "Confirmar",
      message: "CONFIRMAR:",
    },
  ];

  const resposta = await inquirer.prompt(perguntas);

  // Insira os dados coletados na tabela "controle" no banco de dados
  await cliente.create(resposta);

  console.log("Dados inseridos no banco de dados com sucesso!");
}

export default pedidos;
