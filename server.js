import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import Cards from "./dbCards.js";
import dotenv from "dotenv";

// App Config
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const DB_URL = process.env.MONGO_URL;

// Middlewares
app.use(express.json());
app.use(cors());

// DB Config
mongoose.connect(DB_URL);

// API Endpoints
app.get("/", (req, res) =>
  res.status(200).send("Welcome to Tinder Clone Default API Endpoint")
);

// Create card data
app.post("/tinder/card", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// Read card data
app.get("/tinder/card", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listener
app.listen(port, () => console.log(`listening on Port: ${port}`));
