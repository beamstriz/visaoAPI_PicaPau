import axios from 'axios';
import { IUpdateEtiquetaDTO } from '../../DTO/UpdateEtiquetaDTO';
import { RequestHeaders } from '../../sapiensOperations/resquest/RequestHeaders';
var querystring = require('querystring');
export class UpdateEtiquetaUseCase {

    async execute(data: IUpdateEtiquetaDTO): Promise<string> {
        const now = Date.now();
        const requestHeaders = new RequestHeaders;
        const headers = await requestHeaders.execute(data.cookie);
        const baseURL = `https://sapiens.agu.gov.br/visualizador/etiqueta`
        const playload = {
            tarefaId: data.tarefaId,
            creditoId: ``,
            comunicacaoJudicialId: ``,
            etiqueta: data.etiqueta,
        };
        //querystring serve para transforma playload em form
        return await axios.post(baseURL, querystring.stringify(playload) ,{headers}).then(response =>{
            return response.data;
        }).catch(error =>{
            console.log(error)
            return new Error(error);
        })
        // return await UploadDocumenteForSapienInPython(Coockie, fileName, conteudo, documento_id, tipo_documento);
    }
}

