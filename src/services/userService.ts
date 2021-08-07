import { Request, Response } from "express";

import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../entities/User";

interface UserCreate {
  email: string;
  password:string;
}

export async function createUser (user: UserCreate) {
  const hashPassword = bcrypt.hashSync(user.password, 10);
  const finalUser : UserCreate = {email:user.email, password:hashPassword};
  const newUser = await getRepository(User).create(finalUser);
  await getRepository(User).save(newUser);
  return newUser;
}
