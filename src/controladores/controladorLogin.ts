import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import RepositorioUsuario from "../repositorios/repositorioUsuario";

export default class ControladorLogin {
    async login(req: Request, res: Response) {
        const { email, senha } = req.body

        if (!email || !senha) {
            return res.status(400).json({
                message: "Todos os campos são obrigatórios"
            })
        }

        try {
            const repositorioUsuario = new RepositorioUsuario()

            const usuario = await repositorioUsuario.findByEmail(email)

            if (!usuario) {
                return res.status(400).json({
                    message: "E-mail ou senha inválidos"
                })
            }

            const validaSenha = await bcrypt.compare(senha, usuario.senha)

            if (!validaSenha) {
                return res.status(400).json({
                    message: "E-mail ou senha inválidos"
                })
            }

            const token = jwt.sign({ id: usuario.id }, process.env.SECRET_JWT || '', {
                expiresIn: "1h"
            })

            if (!token) {
                return res.status(400).json({ mensagem: "Falha na autenticação" })
            }

            return res.json({ "token": token })
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }
    }
}
