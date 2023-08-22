import axios from "axios";
import { IGetDocumentoDTO } from "../../DTO/GetDocumentoDTO";
import { RequestHeaders } from "../../sapiensOperations/resquest/RequestHeaders";

export class GetDocumentoUseCase {

    async execute(data: IGetDocumentoDTO): Promise<string> {
        const now = Date.now();
        const requestHeaderUploadArquivo = new RequestHeaders;
        const headers = await requestHeaderUploadArquivo.execute(data.cookie);
        const baseURL = `https://sapiens.agu.gov.br/documento/${data.idDocument}`
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