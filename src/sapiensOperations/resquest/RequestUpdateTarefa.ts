export class RequestUpdateTarefa {
    async execute(data: any): Promise<string> {
        
        const updateTarefa = `{
            "action":"SapiensAdministrativo_Tarefa",
            "method":"updateTarefa",
            "data":[
               {
                  "id":${data.id},
                  "observacao":"${data.observacao}",
                  "postIt":"${data.postIt}",
                  "urgente":${data.urgente},
                  "dataHoraInicioPrazo":"${data.dataHoraInicioPrazo.date}",
                  "criadoEm":"${data.criadoEm.date}",
                  "apagadoEm":null,
                  "atualizadoEm":"${data.atualizadoEm.date}",
                  "dataHoraFinalPrazo":"${data.dataHoraFinalPrazo.date}",
                  "dataHoraConclusaoPrazo":null,
                  "pasta_id":${data.pasta.id},
                  "especieTarefa_id":${data.especieTarefa.id},
                  "usuarioResponsavel_id":${data.usuarioResponsavel.id},
                  "setorResponsavel_id":${data.setorResponsavel.id},
                  "setorOrigem_id":"",
                  "documento_id":"",
                  "acompanhar":"",
                  "tramitar":"",
                  "arquivar":"",
                  "usuarioConclusaoPrazo_id":"",
                  "criadoPor_id":${data.criadoPor.id},
                  "atualizadoPor_id":${data.atualizadoPor.id},
                  "acompanhada":false,
                  "comunicacaoJudicial_id":"",
                  "movimentoNacional_id":"",
                  "modalidadeRepercussao_id":"",
                  "replicar":false,
                  "migrarEtiqueta":false,
                  "redistribuida":true,
                  "distribuicaoAutomatica":false,
                  "idFormatado":"${data.idFormatado}"
               }
            ],
            "type":"rpc",
            "tid":${data.tid}
         }`

        //console.log(createDocumento)
        
        return updateTarefa;
    }
}