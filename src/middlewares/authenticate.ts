import { getRepository } from "typeorm";
import express from "express";

import Session from "../entities/Session";
import { NextFunction, Request, Response } from "express-serve-static-core";

export async function authenticate(req:Request, res:Response, next:NextFunction){
    const authorization = req.headers["authorization"];
    const token = authorization.split("Bearer ")[1];
    const repository = getRepository(Session);
    const session = await repository.findOne({token});

    if(!session){
        return res.sendStatus(401);
    }

    next();
}