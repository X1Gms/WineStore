import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";
import "dotenv/config";
import db from "./db.js";
import User from "./schema/User.js";
import Section from "./schema/Section.js";
import Bottle from "./schema/Bottles.js";
import Order from "./schema/Orders.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const PORT = 3000;

app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, 15, async (err, hash) => {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    })
      .then(() => res.send("Registado com Sucesso"))
      .catch((e) => res.send(e));
  });
});

app.get("/getinfo", async (req, res) => {
  const info = [];

  info.push(0);
  info.push(await Section.count());
  info.push(0);

  res.send(info);
});

app.post("/ctsection", async (req, res) => {
  await Section.create({
    section: req.body.section,
  })
    .then(() => res.send("Secção Criada"))
    .catch((e) => res.send(e));
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      // User not found
      res.send(false);
      return;
    }

    bcrypt.compare(req.body.password, user.dataValues.password, () => {
      res.send(user.name);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, async () => {
  try {
    await db.sync();
    console.log(
      `Connection has been established successfully\nRunning on ${PORT} port.`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
