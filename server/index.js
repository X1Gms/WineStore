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
import multer from "multer";
import path from "path";
import util from "util";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const unlinkAsync = util.promisify(fs.unlink);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

const PORT = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/wines");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

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

app.get("/wines", (req, res) => {
  // Read the image file
  fs.readFile("*", (err, data) => {
    if (err) {
      res.status(500).send("Error retrieving image");
      return;
    }
    // Set the appropriate content type
    res.setHeader("Content-Type", "image/jpeg");
    // Send the image data as the response
    res.send(data);
  });
});

app.get("/getinfo", async (req, res) => {
  const info = [];

  info.push(await Bottle.count());
  info.push(await Section.count());
  info.push(0);

  res.send(info);
});

app.get("/getsections", async (req, res) => {
  const info = await Section.findAll({
    attributes: ["section"],
  });

  res.send(info);
});

app.get("/getbottles", async (req, res) => {
  try {
    const sections = await Section.findAll({ attributes: ["section"] });

    const getBottles = await Promise.all(
      sections.map(async (section) => {
        const items = await Bottle.findAll({
          where: { section: section.section },
          attributes: ["id", "name", "price", "section", "imgSrc", "quantity"],
        });

        const updatedItems = items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          section: item.section,
          imgSrc: item.imgSrc.replace(/\\/g, "/"),
          quantity: item.quantity,
        }));

        return {
          section: section.section,
          items: updatedItems,
        };
      })
    );

    const filteredBottles = getBottles.filter((item) => item.items.length > 0);

    res.json(filteredBottles);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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

app.post("/addbottle", upload.single("file"), async (req, res) => {
  try {
    const { section, quantity, bottle, price } = req.body;
    const file = req.file.path;

    if (!price || typeof price !== "string") {
      throw new Error("Price is missing or invalid");
    }

    const newPrice = price.includes(",")
      ? parseFloat(price.replace(",", "."))
      : parseFloat(price);

    if (isNaN(newPrice)) {
      throw new Error("Invalid price format");
    }

    const newFile = file.replace("public\\", "");

    console.log(newPrice);

    const cbottle = await Bottle.create({
      name: bottle,
      price: newPrice,
      section: section,
      imgSrc: newFile,
      quantity: quantity,
    });

    res.send(cbottle);
  } catch (error) {
    // Send an error response
    res.status(400).json({ error: "Error", message: error.message });
  }
});

app.put("/editbottle", upload.single("file"), async (req, res) => {
  try {
    const { section, quantity, bottle, price, id } = req.body;
    const { path: file } = req.file;

    if (!price || isNaN(parseFloat(price.replace(",", ".")))) {
      throw new Error("Invalid price format");
    }

    const newFile = file.replace("public\\", "");

    const cbottle = await Bottle.findByPk(id);

    if (!cbottle) {
      return res
        .status(404)
        .json({ error: "Error", message: "Bottle not found" });
    }

    const oldImgSrc = `./public/${cbottle.imgSrc.replace(/\\/g, "/")}`;

    await unlinkAsync(oldImgSrc);

    cbottle.set({ quantity, name: bottle, section, imgSrc: newFile, price });

    await cbottle.save();

    res.json(cbottle);
  } catch (error) {
    res.status(400).json({ error: "Error", message: error.message });
  }
});

app.post("/deletebottle", async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id);

    const bottle = await Bottle.findOne({
      where: { id: id },
    });

    if (!bottle) {
      throw new Error("Bottle not found");
    }

    const bottlePath = `./public/${bottle.imgSrc.replace(/\\/g, "/")}`;
    await Bottle.destroy({
      where: { id: id },
    });

    await unlinkAsync(bottlePath);

    res.send("Eliminado com Sucesso");
  } catch (e) {
    console.error(e); // Log the error for debugging
    res.status(400).json({ error: "Error", message: e.message });
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
