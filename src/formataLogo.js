// Ola, esse codigo é para realizar a formatação do console.log(No caso o do "Nome do projeto") e Mostrar ele centralizado no Terminal. 
const text = 'SISTEMA DE ESTOQUE';

const textform = `\x1b[1m\x1b[32m${text}\x1b[0m`; // Torna o texto negrito e verde

const largura = process.stdout.columns; // Largura total do terminal

const espaco = Math.floor((largura - textform.length) / 2);

const logo = ' '.repeat(espaco) + textform + ' '.repeat(espaco);

export default logo
