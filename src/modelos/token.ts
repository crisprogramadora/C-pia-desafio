type TToken = {
    senha: string,
    fraseSecreta: string
}

export default class Token {
    senha: string
    fraseSecreta: string

    constructor(token: TToken) {
        this.senha = token.senha
        this.fraseSecreta = token.fraseSecreta
    }
}
