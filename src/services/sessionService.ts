import { Request, Response } from "express";

import { getRepository } from "typeorm";

import User from "../entities/User";
import Session from "../entities/Session";

interface SessionCreate {
  userId: number;
  token:string;
}

export async function createSession (session: SessionCreate) {
    const newSession = await getRepository(Session).create(session);
    await getRepository(Session).save(newSession);
    return newSession;
}