import { Request, Response } from "express";
import { CreateDocumentoUseCase } from "./CreateDocumentoUseCase";

export class CreateDocumentoController {
    constructor(private CreateDocumentoUseCase: CreateDocumentoUseCase,) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const { cookie,
            pasta_id,
            usuario_nome,
            usuario_setor,
            tarefa_id,
            tid,
            tipoDocumento_id,
            modelo_id } = request.body;
        try {
            const result = await this.CreateDocumentoUseCase.execute({
                cookie,
                pasta_id,
                usuario_nome,
                usuario_setor,
                tarefa_id,
                tid,
                tipoDocumento_id,
                modelo_id
            });
            response.status(200).json(result);
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}