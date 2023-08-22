import { RequestGetUsuario } from "../../sapiensOperations/resquest/RequestGetUsuario";
import { UpdateTarefaUseCase } from "./UpdateTarefaUseCase";

const requestGetUsuario = new RequestGetUsuario();
const updateTarefaUseCase = new UpdateTarefaUseCase(requestGetUsuario);

export {updateTarefaUseCase};