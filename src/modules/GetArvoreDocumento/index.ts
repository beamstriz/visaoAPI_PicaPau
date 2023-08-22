import { GetArvoreDocumentoController } from "./GetArvoreDocumentoController";
import { GetArvoreDocumentoUseCase } from "./GetArvoreDocumentoUseCase";

export const getArvoreDocumentoUseCase = new GetArvoreDocumentoUseCase();
export const getArvoreDocumentoController = new GetArvoreDocumentoController(getArvoreDocumentoUseCase);
