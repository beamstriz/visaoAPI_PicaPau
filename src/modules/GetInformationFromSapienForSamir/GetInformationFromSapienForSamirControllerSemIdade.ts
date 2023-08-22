import { Request, Response } from 'express';
import { IGetInformationsFromSapiensDTO } from '../../DTO/GetInformationsFromSapiensDTO';
import { GetInformationFromSapienForSamirUseCase } from './GetInformationFromSapienForSamirUseCase';
import { GetInformationFromSapienForSamirUseCaseSemIdade } from './GetInformationFromSapienForSamirUseCaseSemIdade';

export class GetInformationFromSapienForSamirControllerSemIdade {
    constructor(private getInformationFromSapienForSamirUseCaseSemIdade: GetInformationFromSapienForSamirUseCaseSemIdade,) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const data: IGetInformationsFromSapiensDTO = request.body;
        try {
            const result = await this.getInformationFromSapienForSamirUseCaseSemIdade.execute(data);
            response.status(200).json(result);
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}

