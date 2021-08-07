import { Request, Response } from "express";

import * as userService from "../services/userService";

export async function createUser (req: Request, res: Response) {
  try {
    const users = await userService.createUser(req.body);
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
