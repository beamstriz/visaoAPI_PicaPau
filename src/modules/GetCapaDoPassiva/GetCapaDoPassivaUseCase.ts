import { RequestHeaders } from '../../sapiensOperations/resquest/RequestHeaders';
import axios from 'axios';

export class GetCapaDoPassivaUseCase {

    async execute(nup: string, cookie: string): Promise<string> {
        const now = Date.now();
        const requestHeaderUploadArquivo = new RequestHeaders;
        const headers = await requestHeaderUploadArquivo.execute(cookie);
        const baseURL = `https://sapiens.agu.gov.br/visualizador/capa?nup=${nup}`
        // console.log(headers);
        return await axios.get(baseURL, {headers}).then(response =>{
            //console.log(response.status)
            //console.log(response.data)
            return response.data;
        }).catch(error =>{
            console.log(error)
            return new Error(error);
        })
        // return await UploadDocumenteForSapienInPython(Coockie, fileName, conteudo, documento_id, tipo_documento);
    }
}
