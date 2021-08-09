import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userController";
import * as pokemonController from "./controllers/pokemonController";
import { authenticate } from "./middlewares/authenticate";

const app = express();
app.use(cors());
app.use(express.json());


export async function init () {
  await connectDatabase();

app.post("/sign-up", userController.createUser);
app.post("/login", userController.logUser);
app.get("/pokemons",authenticate, pokemonController.getAllPokemons);
app.post("/pokemons", authenticate, pokemonController.populatePokemons)
app.post("/my-pokemons/:id/add",authenticate, pokemonController.populatePokemons);
}

export default app;
