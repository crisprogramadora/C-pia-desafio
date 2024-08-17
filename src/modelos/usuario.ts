import { randomUUID } from 'node:crypto'

type TUsuario = {
    id?: string
    nome: string
    email: string
    senha: string
}

export default class Usuario {
    readonly id: string
    nome: string
    email: string
    senha: string

    constructor(usuario: TUsuario) {
        this.id = usuario.id ?? randomUUID()
        this.nome = usuario.nome
        this.email = usuario.email
        this.senha = usuario.senha
    }
}
