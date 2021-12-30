import { Request, Response } from "express";
import { MongoClient } from "mongodb";

export type Context = {
    req: Request & { session: Express.Session & { userId?: string} };
    res: Response;
    mongo: MongoClient;
}