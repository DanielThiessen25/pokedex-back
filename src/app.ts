import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userController";

const app = express();
app.use(cors());
app.use(express.json());


export async function init () {
  await connectDatabase();

app.post("/sign-up", userController.createUser);
app.post("/login", userController.logUser);
}

export default app;
