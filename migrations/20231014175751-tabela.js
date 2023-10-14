'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable("controles", {
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
    
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('controles'); 
  }
};
