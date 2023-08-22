// import { Buffer } from 'node:buffer';
import { PreparingForJSON } from '../../helps/PreparingForJSON';
import axios from "axios";
import { RequestHeaderUploadArquivo } from "../../sapiensOperations/resquest/RequestHeaderUploadArquivo";
import { RequestHeaders } from '../../sapiensOperations/resquest/RequestHeaders';
import { requestSapiens } from './requestSapiens';

export async function RequestSapiens(coockie: string, operation:string): Promise<any> {
    const response = await requestSapiens(coockie,operation); 
    return response[0].result.records;
}
// async function requestSapiens(cookie: string, payload: string ): Promise<any>{
//     const requestHeaderUploadArquivo = new RequestHeaders;
//     const headers = await requestHeaderUploadArquivo.execute(cookie);
//         const baseURL = `https://sapiens.agu.gov.br/route`
//         const data = await JSON.parse(payload);
//         return await axios.post(baseURL, data ,{headers}).then(response =>{

//             return response.data;
//         }).catch(error =>{
//             console.log(error)
//             return new Error(error);
//         })
// }