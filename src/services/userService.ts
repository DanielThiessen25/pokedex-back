import { Request, Response } from "express";

import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import User from "../entities/User";
import Session from "../entities/Session";
import * as sessionService from "./sessionService";

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

export async function checkUser (user:UserCreate){
    const emailedUser = await getRepository(User).find({ where: {
      email: user.email 
    }})
    const realUser = emailedUser[0];
    if(bcrypt.compareSync(user.password, realUser.password)){
      const token = uuid();
      const newSession = {userId:realUser.id, token:token};
      const session = await sessionService.createSession(newSession);
      return session;
  }
  else{
    return null;
  }
}

export async function isEmailUsed (email:string){
  const emailedUser = await getRepository(User).find({ where: {
    email: email 
  }});
  if(emailedUser === [] || emailedUser.length === 1){
    return false;
  }
  else{
    return true;
  }
}