import inquirer from "inquirer";
import pedidos from "./requisicoes.js";
const menu = [
  {
    type: "list",
    name: "choice",
    message: "Escolha uma opção:",
    choices: ["Nova requisição", "Listar  as requisições", "Exit"],
  },
];

function main() {
  inquirer.prompt(menu).then((answers) => {
    switch (answers.choice) {
      case "Nova requisição":
        pedidos();
        break;
      case "Listar as requisições":
        console.log("Você escolheu  as  requisições.");
        console.log(requisicoes);
        break;
      case "exit":
        break;
    }
  });
}
export default main;
