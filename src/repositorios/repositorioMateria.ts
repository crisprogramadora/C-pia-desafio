import pool from "../bancoDeDados"

type PropriedadesMateria = {
    id: string
    nome: string
    criado: Date
}

export default class RepositorioMateria {

    async find() {
        const query = 'select * from materias'
        const { rows } = await pool.query(query)
        return rows
    }

    async findBy(id: PropriedadesMateria) {
        const query = 'select * from materias where id = $1'
        const { rows } = await pool.query(query, [id])
        return rows[0]
    }
}