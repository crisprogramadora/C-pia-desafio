import { Request, Response } from "express";
import bcypt from 'bcrypt';
import pool from "../bancoDeDados";

export default class ControladorUsuario {
	async cadastrarUsuario(req: Request, res: Response) {
		const { nome, email, senha } = req.body

		try {

			if (!nome || !email || !senha) {
				return res.status(400).json({ menssagem: "Todos os campos são obrigatórios" })
			}

			const existeEmail = await pool.query(`Select * from usuarios where email = $1`, [email])

			if (!existeEmail) {
				return res.status(400).json({
					menssagem: "E-mail já cadastrado"
				})
			}

			const hashSenha = await bcypt.hash(senha, 10)

			const query = `insert into usuarios(nome, email,senha) values ($1, $2, $3) returning *`
			const parametros = [nome, email, hashSenha]
			const { rows, rowCount } = await pool.query(query, parametros)

			if (rowCount === null) {
				return res.status(400).json({
					mensagem: "O erro pode estar aqui"
				})
			}


			const usuarioRegistrado = rows[0]

			const { senha: _, ...dadosDoUsuario } = usuarioRegistrado
			return res.status(201).json({ usuarioRegistrado })

		} catch (error) {
			const erro = error as Error
			return res.status(400).json({
				menssagem: erro.message
			})
		}
	}
}