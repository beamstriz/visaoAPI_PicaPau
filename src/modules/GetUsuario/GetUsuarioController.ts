import { Request, Response } from 'express';
import { GetUsuarioUseCase } from './GetUsuarioUseCase';

export class GetUsuarioController {
    constructor(private GetUsuarioUseCase: GetUsuarioUseCase,) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const { Coockie } = request.body;
        try {
            const result = await this.GetUsuarioUseCase.execute(Coockie);
            response.status(200).json(result);
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}