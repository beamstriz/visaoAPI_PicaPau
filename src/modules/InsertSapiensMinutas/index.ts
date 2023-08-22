import { InsertSapiensMinutasUseCase } from './InsertSapiensMinutasUseCase';
import { InsertSapiensMinutasController } from './InsertSapiensMinutasController';

const insertSapiensMinutasUseCase = new InsertSapiensMinutasUseCase();
const insertSapiensMinutasController = new InsertSapiensMinutasController(insertSapiensMinutasUseCase);

export {insertSapiensMinutasUseCase , insertSapiensMinutasController };