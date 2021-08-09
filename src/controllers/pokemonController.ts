import { Request, Response } from "express";

import * as userService from "../services/userService";
import * as sessionService from "../services/sessionService";

export async function getAllPokemons (req: Request, res: Response) {
    try {
      
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  }