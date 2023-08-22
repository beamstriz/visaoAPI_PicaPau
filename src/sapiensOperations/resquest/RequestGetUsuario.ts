export class RequestGetUsuario {
    async execute(): Promise<string> {
        const getTarefa = `{
            "action": "SapiensMain_Usuario",
            "method": "getUsuario",
            "data": [{
                "sessao": "True",
                "fetch": ["colaborador",
                    "colaborador.modalidadeColaborador",
                    "colaborador.lotacoes",
                    "colaborador.lotacoes.setor",
                    "colaborador.lotacoes.setor.especieSetor",
                    "colaborador.lotacoes.setor.unidade",
                    "colaborador.lotacoes.setor.unidade.modalidadeOrgaoCentral",
                    "colaborador.lotacoes.setor.unidade.generoSetor"],
                "filter": [{
                    "property": "colaborador.lotacoes.id",
                    "value": "isNotNull"},
                    {"property": "colaborador.lotacoes.setor.ativo",
                        "value": "eq:1"}],
                "page": 1,
                "start": 0,
                "limit": 25}],
            "type": "rpc",
            "tid": 0
        }`
        
        return getTarefa;
    }
}