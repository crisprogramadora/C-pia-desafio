import { NextFunction, Request, Response } from "express"
import jwt, { TokenExpiredError } from "jsonwebtoken"

export default class Token {
    async operacoesComToken(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers

        try {
            if (!authorization) {
                return res.status(401).json({ message: "Falha na autenticação" })
            }

            const token = authorization.split(' ')[1]

            return res.status(201).json({ token });

        } catch (error) {
            if (error instanceof TokenExpiredError) {
                return res.status(403).json({
                    message: 'sem permissão'
                })
            }
        }
        next()
    }
}

export const gerarToken = async (senha: string) => {

    try {
        const token = jwt.sign(senha, process.env.SENHA_JWT || "", {
            expiresIn: "1h",
        });

        return token;
    } catch (error) {
        return false;
    }
};
// const token = jwt.sign(senha, process.env.SECRET_JWT || "", {
//     expiresIn: "1h",
// });

// return token;


export const idUsuarioNoToken = async (token: string) => {
    try {

        const { id } = jwt.verify(token, process.env.SECRET_JWT || "") as jwt.JwtPayload;

        return id;
    } catch (error) {
        return false;
    }

};


