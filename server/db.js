import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("test", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

export default sequelize;
