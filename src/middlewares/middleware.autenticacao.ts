import { NextFunction, Request, Response } from "express";
import pool from "../bancoDeDados";
import { idUsuarioNoToken } from "./middleware.token";

export const middlewareDeAutenticacao = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    try {
        if (!authorization) {
            return res.status(401).json({ message: "Falha na autenticação" })
        }

        const token = authorization.split(' ')[1]

        const id = idUsuarioNoToken(token)

        if (!id) {
            return res.status(401).json({ message: "Falha na autenticação" })
        }

        const { rows: idCadastrado } = await pool.query(
            `SELECT * FROM usuarios where id = $1`, [id]);

        if (idCadastrado.length === 0) {
            return res.status(401).json({ message: "Falha na autenticação" })
        }

        next()
    } catch (error) {
        const erro = error as Error
        return res.status(400).json({
            message: erro.message
        })

    }
}