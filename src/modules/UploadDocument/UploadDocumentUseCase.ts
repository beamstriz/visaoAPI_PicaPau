import { RequestHeaderUploadArquivo } from "../../sapiensOperations/resquest/RequestHeaderUploadArquivo";
import axios from 'axios';


export class UploadDocumentUseCase {

    async execute(Coockie: string, fileName: string, conteudo: string, documento_id: string, tipo_documento: string): Promise<any> {
        const requestHeaderUploadArquivo = new RequestHeaderUploadArquivo;
        const headers = await requestHeaderUploadArquivo.execute({file_name: fileName, cookie: Coockie, tamanho: conteudo.length});
        const baseURL = `https://sapiens.agu.gov.br/upload_arquivo?documento=${documento_id}`
        const data = conteudo;
        return await axios.post(baseURL, data, {headers}).then(response =>{
            console.log(response.status)
            console.log(response.data)
            return response.status;
        }).catch(error =>{
            console.log(error)
            return new Error(error);
        })
        // return await UploadDocumenteForSapienInPython(Coockie, fileName, conteudo, documento_id, tipo_documento);
    }
}