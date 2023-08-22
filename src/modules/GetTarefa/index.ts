
import { RequestGetTarefa } from '../../sapiensOperations/resquest/RequestGetTarefa';
import { GetTarefaController } from './GetTarefaController';
import { GetTarefaUseCase } from './GetTarefaUseCase';

const requestGetTarefa = new RequestGetTarefa();
const getTarefaUseCase = new GetTarefaUseCase(requestGetTarefa);
const getTarefaController = new GetTarefaController(getTarefaUseCase);

export { getTarefaUseCase, getTarefaController };