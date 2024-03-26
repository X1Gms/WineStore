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
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

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

const generateJWT = (data) => {
  return jwt.sign(data, process.env.KWAMI, { expiresIn: "1800s" });
};
const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.KWAMI, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

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

app.get("/getinfo", authToken, async (req, res) => {
  const info = [];

  info.push(await Bottle.count());
  info.push(await Section.count());
  info.push(await Order.count());

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

app.post("/ctsection", authToken, async (req, res) => {
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

    const match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
      // Passwords match
      const token = generateJWT({
        username: user.name,
        password: user.password,
      });
      res.send({ name: user.name, token: token });
    } else {
      // Passwords don't match
      res.send(false);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addbottle", authToken, upload.single("file"), async (req, res) => {
  let filePath; // Variable to store the file path
  try {
    const { section, quantity, bottle, price } = req.body;
    const file = req.file;

    if (!price || typeof price !== "string") {
      throw new Error("Price is missing or invalid");
    }

    const newPrice = price.includes(",")
      ? parseFloat(price.replace(",", "."))
      : parseFloat(price);

    if (isNaN(newPrice)) {
      throw new Error("Invalid price format");
    }

    if (file) {
      // If file is uploaded
      filePath = file.path;
      const newFile = filePath.replace("public\\", ""); // Modify file path

      const cbottle = await Bottle.create({
        name: bottle,
        price: newPrice,
        section: section,
        imgSrc: newFile,
        quantity: quantity,
      });

      res.send(cbottle);
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    if (filePath) {
      fs.unlinkSync(filePath);
    }
    res.status(500).send({ error: error.message });
  }
});

app.put("/editbottle", authToken, upload.single("file"), async (req, res) => {
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

app.post("/deletebottle", authToken, async (req, res) => {
  try {
    const id = req.body.id;
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

app.post("/addorder", async (req, res) => {
  try {
    const { address, email, name, order, phone } = req.body;

    await Order.create({
      name: name,
      email: email,
      phoneNumber: phone,
      Address: address,
      Order: order,
    });

    res.send("Successfully Sent");
  } catch (e) {
    res.send(e);
  }
});

app.get("/getorder", authToken, async (req, res) => {
  try {
    const getOrder = await Order.findAll({
      attributes: [
        "id",
        "name",
        "email",
        "phoneNumber",
        "Address",
        "Order",
        "createdAt",
      ],
    });

    getOrder.forEach((item) => {
      item.Order = JSON.parse(item.Order);
    });

    res.send(getOrder);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/finishorder", authToken, async (req, res) => {
  try {
    const { id } = req.body;

    await Order.destroy({
      where: { id: id },
    });

    res.send("Successfully done");
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(PORT, async () => {
  try {
    await db.sync();
    console.log(
      `Connection has been successfully established \nRunning on ${PORT} port.`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
