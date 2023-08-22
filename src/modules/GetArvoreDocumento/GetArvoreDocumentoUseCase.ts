import axios from "axios";
import { IGetArvoreDocumentoDTO } from "../../DTO/GetArvoreDocumentoDTO";
import { RequestHeaders } from "../../sapiensOperations/resquest/RequestHeaders";
import { ResponseArvoreDeDocumento } from "../../sapiensOperations/response/ResponseArvoreDeDocumento";



export class GetArvoreDocumentoUseCase {

    async execute(data: IGetArvoreDocumentoDTO): Promise<Array<ResponseArvoreDeDocumento>> {
        const now = Date.now();
        const requestHeaderUploadArquivo = new RequestHeaders;
        const headers = await requestHeaderUploadArquivo.execute(data.cookie);
        const baseURL = `https://sapiens.agu.gov.br/visualizador/arvore?_dc=${now}&nup=${data.nup}&node=root`
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
