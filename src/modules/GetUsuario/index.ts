import { GetUsuarioUseCase } from './GetUsuarioUseCase';
import { GetUsuarioController } from './GetUsuarioController';
import { RequestGetUsuario } from '../../sapiensOperations/resquest/RequestGetUsuario';

const requestGetUsuario = new RequestGetUsuario();
const getUsuarioUseCase = new GetUsuarioUseCase(requestGetUsuario);
const getUsuarioController = new GetUsuarioController(getUsuarioUseCase);

export { getUsuarioUseCase, getUsuarioController };