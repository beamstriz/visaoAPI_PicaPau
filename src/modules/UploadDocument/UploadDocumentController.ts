import { Request, Response } from 'express';
import { UploadDocumentUseCase } from "./UploadDocumentUseCase";

export class UploadDocumentController {
    constructor(private UploadDocumentUseCase: UploadDocumentUseCase,) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const { cookie, fileName, conteudo, tipo_documento, documento_id } = request.body;
        try {
            const response = await this.UploadDocumentUseCase.execute(cookie, fileName, conteudo, documento_id, tipo_documento);
            response.status(200).json(response);
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}