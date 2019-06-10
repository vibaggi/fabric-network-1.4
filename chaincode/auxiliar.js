const ClientIdentity = require('fabric-shim').ClientIdentity;


class Auxiliar{

    //
    // Classe com funções auxiliares ao código de chaincode. Independente da regra de negocio.
    //

    static jsonParaBytes(resposta){
        let resultado = JSON.stringify(resposta);
        return Buffer.from(resultado);
    }

    static async iteradorParaJSON(iterador, historico) {
        let vetorResultado = [];
        while (true) {
            let resposta = await iterador.next();
            if (resposta.value && resposta.value.value.toString()) {
                let jsonResposta = {};
                if (historico && historico === true) {
                    jsonResposta.TxId = resposta.value.tx_id;
                    jsonResposta.dataTransacacao = new Date(resposta.value.timestamp.seconds.low*1000 - (1000 * 60 * 60 * 3));
                    try {
                        jsonResposta.dado = JSON.parse(resposta.value.value.toString('utf8'));
                    } catch (erro) {
                        console.log(erro);
                        jsonResposta.dado = resposta.value.value.toString('utf8');
                    }
                } else {
                    jsonResposta.Chave = resposta.value.key;
                    try {
                        jsonResposta.Registro = JSON.parse(resposta.value.value.toString('utf8'));
                    } catch (erro) {
                        jsonResposta.Registro = resposta.value.value.toString('utf8');
                    }
                }
                vetorResultado.push(jsonResposta);
            }
            if (resposta.done) {
                await iterador.close();
                return vetorResultado;
            }
        }
    }

    static extrairMSPID(stub){
        if(!stub.txId) return "TEST_ISPB11111"
        let _clientIdentity = new ClientIdentity(stub);
        let mspid = _clientIdentity.getMSPID();
        // tratamento do MSPID , regras de neogio
        //
        if(mspid) {
            return mspid
        }

        return null
    } 

}

module.exports = Auxiliar