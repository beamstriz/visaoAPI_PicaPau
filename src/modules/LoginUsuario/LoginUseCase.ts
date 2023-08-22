import { ILoginDTO } from '../../DTO/LoginDTO'
import {LoginSapiens} from '../../pytonRequest/loginSapiens'

export class LoginUseCase {
    async execute(data: ILoginDTO): Promise<string> {
        console.log("login inicializado")
        return await LoginSapiens(data);
    }
}