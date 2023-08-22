export class RequestGetTarefa {
    async execute(idUsuario: string, etiqueta?: string, processoJudicial?: string): Promise<string> {
        let filter = "";

        if(!(processoJudicial == null || processoJudicial == "")){
            processoJudicial = `{"type":"string","value":"${processoJudicial}","field":"pasta.processoJudicial.numero"}`;
        }else{
            processoJudicial = ""
        }


        if(!(etiqueta == null || etiqueta == "")){
            etiqueta = `{"type":"string","value":"${etiqueta}","field":"postIt"}`;
        }else{
            etiqueta = "";
        }

        if((!(etiqueta == null || etiqueta == "")) || !(processoJudicial == null || processoJudicial == "")){
            filter =`"gridfilter":[${processoJudicial}${(etiqueta != "" && processoJudicial != "")? "," : ""} ${etiqueta}],`
        }
        const getTarefa = `{
            "action": "SapiensAdministrativo_Tarefa",
            "method": "getTarefa",
            "data": [
                {
                    "fetch": [
                        "pasta",
                        "pasta.setor",
                        "pasta.setor.unidade",
                        "pasta.processoJudicial",
                        "pasta.comunicacaoOrigem",
                        "comunicacaoJudicial",
                        "especieTarefa",
                        "especieTarefa.generoTarefa",
                        "setorResponsavel",
                        "setorResponsavel.unidade",
                        "usuarioResponsavel",
                        "minutas",
                        "minutas.tipoDocumento",
                        "minutas.tipoDocumento.especieDocumento",
                        "minutas.componentesDigitais",
                        "minutas.componentesDigitais.assinaturas",
                        "minutas.vinculacoesDocumentos",
                        "minutas.vinculacoesDocumentos.documentoVinculado",
                        "minutas.vinculacoesDocumentos.documentoVinculado.tipoDocumento",
                        "minutas.vinculacoesDocumentos.documentoVinculado.componentesDigitais",
                        "minutas.vinculacoesDocumentos.documentoVinculado.componentesDigitais.assinaturas",
                        "criadoPor",
                        "atualizadoPor",
                        "pasta.localizador",
                        "pasta.relevancias",
                        "pasta.lembretes",
                        "pasta.interessados",
                        "pasta.interessados.pessoa",
                        "pasta.assuntos",
                        "pasta.assuntos.assuntoAdministrativo"
                    ],
                    "filter": [
                        {
                            "property": "usuarioResponsavel.id",
                            "value": "eq:${idUsuario}"
                        },
                        {
                            "property": "dataHoraConclusaoPrazo",
                            "value": "isNull"
                        }
                    ],
                    ${filter}
                    "page": 1,
                    "start": 0,
                    "limit": 50
                }
            ],
            "type": "rpc",
            "tid": 2
        }`
        return getTarefa;
    }
}