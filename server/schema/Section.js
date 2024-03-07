import { DataTypes } from "sequelize";
import db from "../db.js";

const Section = db.define("Section", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  section: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

export default Section;
