import { randomUUID } from 'node:crypto';

type TResumo = {
    id?: string;
    usuarioId: string;
    materiaId: string;
    titulo: string;
    topicos: string[];
    descricao: string;
    criado?: Date;
};

export default class Resumo {
    readonly id: string;
    usuarioId: string;
    materiaId: string;
    titulo: string;
    topicos: string[];
    descricao: string;
    criado: Date;

    constructor(resumo: TResumo) {
        this.id = resumo.id ?? randomUUID()
        this.usuarioId = resumo.usuarioId
        this.materiaId = resumo.materiaId
        this.titulo = resumo.titulo
        this.topicos = resumo.topicos
        this.descricao = resumo.descricao
        this.criado = new Date()
    }
}
