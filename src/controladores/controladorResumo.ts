import { Request, Response } from "express";
import RepositorioResumo from "../repositorios/repositorioResumo";
import { randomUUID } from 'node:crypto';
import pool from "../bancoDeDados";
import idUsuarioNoToken from "../middleares/midleware.token";

export default class ControladorResumo {
    async cadastrarResumo(req: Request, res: Response) {
        const { materiaId, titulo, topicos } = req.body

        if (!materiaId || !topicos) {
            return res.status(400).json({
                message: "Todos os campos são obrigatórios"
            })
        }

        try {
            const topicosInvalidos = [" "]

            if (topicos === topicosInvalidos) {
                return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" })
            }
            const idUsuario = await pool.query(`Select * from usuarios where id = $1`, [idUsuarioNoToken])

            const resumo = {
                id: randomUUID(),
                usuarioId: idUsuario,
                materiaId,
                titulo,
                topicos,
                criado: Date()
            }

            if (!titulo) {
                resumo.id,
                    resumo.usuarioId,
                    resumo.materiaId,
                    resumo.titulo = "Sem nome",
                    resumo.topicos,
                    resumo.criado
            }

            return res.status(201).json({ resumo })
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }
    }

    async listarResumos(req: Request, res: Response) {
        try {
            const { rows: resumosCadastrados } = await pool.query(`select * from resumos`)
            return res.status(201).json(resumosCadastrados)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }
    }

    async listarResumosPorMateria(req: Request, res: Response) {
        const { materiaId } = req.params

        try {

            const { rows: resumosPorMateria } = await pool.query(`select * from resumos where materiaId = $1`, [materiaId])
            return res.status(201).json(resumosPorMateria)

        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }
    }

    async editarResumo(req: Request, res: Response) {
        const { id, token } = req.params

        try {
            const repositorioResumo = new RepositorioResumo()

            const resumo = await repositorioResumo.findById(id)

            if (!id || !token) {
                return res.status(400).json({
                    message: "Todos os campos são obrigatórios"
                })
            }

            return res.json(resumo)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }
    }

    async deletarResumo(req: Request, res: Response) {
        const { id } = req.params

        try {
            const repositorioResumo = new RepositorioResumo()

            const resumo = await repositorioResumo.findById(id)

            if (!id) {
                return res.status(400).json({
                    message: "Todos os campos são obrigatórios"
                })
            }

            return res.send()
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }
    }
}