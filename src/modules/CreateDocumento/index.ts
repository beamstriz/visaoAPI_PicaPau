import { RequestCreateDocumento } from '../../sapiensOperations/resquest/RequestCreateDocumento';
import { CreateDocumentoController } from './CreateDocumentoController';
import { CreateDocumentoUseCase } from './CreateDocumentoUseCase';

const requestCreateDocumento = new RequestCreateDocumento();
const createDocumentoUseCase = new CreateDocumentoUseCase(requestCreateDocumento);
const createDocumentoController = new CreateDocumentoController(createDocumentoUseCase);

export { createDocumentoUseCase, createDocumentoController };