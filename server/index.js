import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";
import "dotenv/config";
import db from "./db.js";
import User from "./schema/User.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const PORT = 3000;

app.post("/register", (req, res) => {
  console.log(req.body.name);
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

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    console.log(user);

    if (!user) {
      // User not found
      res.send(false);
      return;
    }

    bcrypt.compare(
      req.body.password,
      user.dataValues.password,
      (err, result) => {
        res.send(result);
      }
    );
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
