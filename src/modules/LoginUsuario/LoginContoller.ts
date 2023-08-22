import { Request, Response } from 'express';
import { LoginUseCase } from './LoginUseCase';

export class LoginController {
    constructor(private loginUseCase: LoginUseCase,) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const { cpf, senha } = request.body;
        try {
            const cookie = await this.loginUseCase.execute({ cpf, senha });
            response.status(200).json(cookie);
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}