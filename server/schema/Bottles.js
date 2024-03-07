import { DataTypes } from "sequelize";
import db from "../db.js";

const Bottle = db.define("Bottle", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imgSrc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Quantity: {
    type: DataTypes.INTEGER,
  },
});

export default Bottle;
