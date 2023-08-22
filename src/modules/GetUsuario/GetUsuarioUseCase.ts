import { RequestSapiens } from "../../pytonRequest/requestSapiens";
import { RequestGetUsuario } from "../../sapiensOperations/resquest/RequestGetUsuario";

export class GetUsuarioUseCase {
    constructor(private RequestGetUsuario:RequestGetUsuario){};
    async execute(cookie: string): Promise<any> {

        const getUsuario = await this.RequestGetUsuario.execute();
        
        const response = (await RequestSapiens(cookie, getUsuario));
        
        return response;
    }
}