import { LoginUseCase } from './LoginUseCase';
import { LoginController } from './LoginContoller';

const loginUseCase = new LoginUseCase();
const loginController = new LoginController(loginUseCase);

export {loginUseCase, loginController};