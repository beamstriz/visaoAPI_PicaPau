import axios from "axios";
import { RequestHeaders } from "../../sapiensOperations/resquest/RequestHeaders";
export async function requestSapiens(cookie: string, payload: string): Promise<any> {
    const requestHeaderUploadArquivo = new RequestHeaders;
    const headers = await requestHeaderUploadArquivo.execute(cookie);
    const baseURL = `https://sapiens.agu.gov.br/route`
    const data = await JSON.parse(payload);
    return await axios.post(baseURL, data, { headers }).then(response => {

        return response.data;
    }).catch(error => {
        console.log(error)
        return new Error(error);
    })
}