import { Sequelize } from "sequelize"

const bd = new Sequelize('controle', 'gabriel', '123456', {
  dialect: 'postgres',
  host: 'localhost',
  logging: false,
  port: 5432,
  define: {
    timestamps: false,
  },
});


export default bd