import { NextFunction, Request, Response } from "express"
import bcrypt from 'bcrypt'


export async function senhaValida(req: Request, res: Response, next: NextFunction) {
    const { senha } = req.body

    const hashSenha = await bcrypt.hash(senha, 10)

    const senhaValida = await bcrypt.compare(senha, hashSenha)

    if (!senhaValida) {
        return false;
    }

    return true;
}

export default senhaValida;



