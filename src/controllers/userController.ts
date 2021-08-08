import { Request, Response } from "express";

import * as userService from "../services/userService";
import * as sessionService from "../services/sessionService";

function isValidEmail(email:string){
  const emailStr = String(email).trim();
  if(emailStr.includes(" ")){
      return false;
  }
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(emailStr);
}

export async function createUser (req: Request, res: Response) {
  try {
    const users = await userService.createUser(req.body);
    res.sendStatus(201);
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function logUser (req: Request, res: Response){
  try{
    const {email, password} = req.body;

    if(!isValidEmail(email)){
      return res.sendStatus(400);
  }
   const session = await userService.checkUser({email:email, password:password});
   if(session != null){
     res.send(session.token).sendStatus(200);
   }
   else{
     res.sendStatus(401);
   }

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}