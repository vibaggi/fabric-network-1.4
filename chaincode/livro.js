
class Livro{

    constructor(id, nome, autor, ano){
        this.id = id
        this.nome = nome
        this.autor = autor
        this.ano = ano
    }

    paraJSON() {
        return {
            id: this.id,
            nome: this.nome,
            autor: this.autor,
            ano: this.ano
        }
    }


}


 module.exports = Livro