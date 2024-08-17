import pool from "../bancoDeDados"


type PropriedadesUsuario = {
    id: string
    nome: string
    email: string
    senha: string
}

export default class RepositorioUsuario {
    async findByEmail(email: string) {

        const query = 'select * from usuarios where email = $1'
        const { rows } = await pool.query(query, [email])
        return rows[0]

    }

    async findById(id: string) {
        const query = 'select * from usuarios where id = $1'
        const { rows } = await pool.query(query, [id])
        return rows[0]
    }

    async create(usuario: PropriedadesUsuario) {
        const query = 'insert into usuarios (id, nome, email, senha) values ($1, $2, $3, $4)'
        await pool.query(query, [usuario.id, usuario.nome, usuario.email, usuario.senha])
    }
}
