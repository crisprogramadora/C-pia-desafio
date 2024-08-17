import { Request, Response } from "express";
import pool from "../bancoDeDados";

export const listarMaterias = async (req: Request, res: Response) => {
    try {
        const { rows: materiasCadastradas } = await pool.query(`select * from materias`)
        return res.status(200).json({ materiasCadastradas })
    } catch (error) {
        const erro = error as Error
        return res.status(400).json({ message: erro.message })
    }
}

export default listarMaterias;
