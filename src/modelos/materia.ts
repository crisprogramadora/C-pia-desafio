import { randomUUID } from 'node:crypto'

type TMateria = {
    id?: string
    nome: string
}

export default class Materia {
    readonly id: string
    nome: string
    criacao?: Date

    constructor(materia: TMateria) {
        this.id = materia.id ?? randomUUID()
        this.nome = materia.nome
        this.criacao = new Date()
    }
}
