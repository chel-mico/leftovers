import { EntityManager } from "typeorm";
import { Request, Response } from "express";
import { RedisClientType } from "redis";

export type Context = {
    req: Request;
    res: Response;
    redis: RedisClientType;
}