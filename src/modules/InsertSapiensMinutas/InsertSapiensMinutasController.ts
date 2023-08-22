import { Request, Response } from 'express';
import { InsertSapiensMinutasUseCase } from './InsertSapiensMinutasUseCase';

export class InsertSapiensMinutasController {
    constructor(private requestInformationForSamir: InsertSapiensMinutasUseCase,) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const { login, etiqueta, minutas } = request.body;
        try {
            const result = await this.requestInformationForSamir.execute({ login, etiqueta, minutas});
            response.status(200).json(result);
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}