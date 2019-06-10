/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('./node_modules/fabric-contract-api');
const Auxiliar = require('./auxiliar');
const Livro = require('./livro')

class Chaincode extends Contract {

    // Método que é chamado para a instanciação do Blockchain
    async initLedger(ctx) {
        console.info('============= INÍCIO : INICIANDO LEDGER ===========');
    }

    /**
     * Inserir um livro no ledger
     * @param {*} ctx 
     * @param {*} id - numero identificador do livro
     * @param {*} nome - nome do livro
     * @param {*} autor - autor do livro
     * @param {*} ano - ano de publicação do livro
     */
    async criarLivro(ctx, id, nome, autor, ano){

        let livro = new Livro(id, nome, autor, ano)
        console.log((await ctx.stub.getState(id)).toString() );
        if( (await ctx.stub.getState(id)).toString() != "" ) throw new Error("Transacao REJEITADA. LIVRO ja existe")

        await ctx.stub.putState(id, JSON.stringify(livro.paraJSON()))

        return "Livro Cadastrado"

    }

    /**
     * Consulta um livro por id do dispositivo
     * @param {*} ctx 
     * @param {*} id 
     */
    async consultaLivro(ctx, id){

        var livro = await ctx.stub.getState(id).toString()
        if(livro == "") return {
            codigo: 404,
            mensagem: "nenhum livro encontrado"
        }

        return JSON.stringify(livro)

    }


}

module.exports = Chaincode;
