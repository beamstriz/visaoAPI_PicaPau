import { ICreateDocumentDTO } from '../../DTO/CreateDocumentDTO';
import { RequestSapiens } from '../../pytonRequest/requestSapiens';
import { RequestCreateDocumento } from '../../sapiensOperations/resquest/RequestCreateDocumento';
export class CreateDocumentoUseCase {
    constructor(private RequestCreateDocumento:RequestCreateDocumento){};
    async execute(data: ICreateDocumentDTO): Promise<any> {

        const playload = await this.RequestCreateDocumento.execute(data);
        
        const response = (await RequestSapiens(data.cookie, playload))
        
        return response;
    }
}