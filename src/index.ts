import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import "./db";
import indexRoutes from "./routes";

const app = express();

const start = async () => {
  try {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use("/", indexRoutes);
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};
start();
