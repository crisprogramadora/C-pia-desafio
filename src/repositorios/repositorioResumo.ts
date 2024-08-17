import pool from "../bancoDeDados"

type PropriedadesResumo = {
    id: string
    usuarioId: string
    materiaId: string
    titulo?: string
    topicos: string[]
    descricao: string
    criado: Date
}

type PropriedadesUpdateResumo = {
    materiaId: string
    titulo: string
}

export default class RepositorioResumo {

    async findById(materiaId: string) {
        const query = 'select * from resumos where id = $1'
        const { rows } = await pool.query(query, [materiaId])
        return rows[0]
    }

    async find() {
        const query = 'select * from resumos'
        const { rows } = await pool.query(query)
        return rows[0]
    }

    async create(resumo: PropriedadesResumo) {
        const query = 'insert into resumos (id, usuarioId, materiaId, titulo, topicos, descricao, criado) values ($1, $2, $3, $4, $5, $6, $7)'
        await pool.query(query, [resumo.id, resumo.usuarioId, resumo.materiaId, resumo.titulo, resumo.topicos, resumo.descricao, resumo.criado])
    }

    async update(id: string, resumo: PropriedadesUpdateResumo) {
        const query = 'update resumos set materiaId = $1, set titulo = $2'
        await pool.query(query, [resumo.materiaId, resumo.titulo, id])
    }

    async delete(id: string) {
        const query = 'delete from resumos where id = $1'
        const { rows } = await pool.query(query, [id])
        return rows[0]
    }

}