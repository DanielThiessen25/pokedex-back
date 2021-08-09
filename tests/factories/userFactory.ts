import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import User from "../../src/entities/User";
import Session from "../../src/entities/Session";

export async function createUser () {
  const hashPassword = bcrypt.hashSync("123456", 10);
  const user = await getRepository(User).create({
    email: "email@email.com",
    password: hashPassword
  });

  await getRepository(User).save(user);

  return user;
}

export async function authenticateUser (user:User){
  const newSession = await getRepository(Session).create({
    userId: user.id,
    token:"token_certo"
  });

  await getRepository(Session).save(newSession);
  return newSession;
  
}
