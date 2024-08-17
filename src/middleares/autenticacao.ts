import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({
            message: "Falha na autenticação"
        })
    }

    const token = authorization.split(' ')[1]

    try {
        jwt.verify(token, process.env.SECRET_JWT || '')
        return res.status(204).send()
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(403).json({
                message: "Falha na autenticação"
            })
        }
    }
    next()
}
