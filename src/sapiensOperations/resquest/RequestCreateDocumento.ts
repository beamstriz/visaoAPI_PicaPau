import { ICreateDocumentDTO } from "../../DTO/CreateDocumentDTO";

export class RequestCreateDocumento {
    async execute(data: ICreateDocumentDTO): Promise<string> {
        if(data.tipoDocumento_id == null || data.tipoDocumento_id == ""){
            data.tipoDocumento_id = "1344"
        }
        if(data.modelo_id == null || data.modelo_id == ""){
            data.modelo_id = ""
        }
        const createDocumento = `{
            "action":"SapiensAdministrativo_Documento",
            "method":"createDocumento",
            "data":[
               {
                  "numeroFolhas":3,
                  "dataHoraProducao":"",
                  "localProducao":"",
                  "vinculado":false,
                  "copia":false,
                  "observacao":"",
                  "autor":"${data.usuario_nome}",
                  "pasta_id":${data.pasta_id},
                  "redator":"${data.usuario_nome}",
                  "procedencia_id":"",
                  "tipoDocumento_id":${data.tipoDocumento_id},
                  "modelo_id":"${data.modelo_id}",
                  "comunicacaoRemessa_id":"",
                  "setorOrigem_id":${data.usuario_setor},
                  "tarefaOrigem_id":${data.tarefa_id},
                  "visibilidadeRestrita":false,
                  "semEfeito":false,
                  "localizadorOriginal":"",
                  "minuta":true,
                  "outroNumero":"",
                  "criadoPor_id":"",
                  "origemDados_id":"",
                  "atualizadoPor_id":"",
                  "anexaCopia":"",
                  "descricaoOutros":"",
                  "anexaCopiaVinculados":false,
                  "parentId":null,
                  "leaf":false
               }
            ],
            "type":"rpc",
            "tid":${data.tid}
         }`

        //console.log(createDocumento)
        
        return createDocumento;
    }
}