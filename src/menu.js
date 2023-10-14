import inquirer from "inquirer";
import reqs from "./requisicoes.js";

const menu = [
  {
    type: "list",
    name: "choice",
    message: "Escolha uma opção:",
    choices: ["Nova requisição", "Listar as requisições", "Exit"],
  },
];

async function main() {
  inquirer.prompt(menu).then(async (answers) => {
    switch (answers.choice) {
      case "Nova requisição":
        await reqs.pedidos();
        break;
      case "Listar as requisições":
        await reqs.listarrequisicoes(); 
        await reqs.exibirMenuPrincipal()
        break;
      case "Exit":
        console.log("Saindo do programa.");
        process.exit(0);
        break;
    }
  });
}

export default main;
