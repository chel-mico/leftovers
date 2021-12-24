import { Request, Response } from "express";
import { MongoClient } from "mongodb";

export type Context = {
    req: Request & { session: Express.Session };
    res: Response;
    mongo: MongoClient;
}