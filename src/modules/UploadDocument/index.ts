import { UploadDocumentController } from "./UploadDocumentController";
import { UploadDocumentUseCase } from "./UploadDocumentUseCase";

const uploadDocumentUseCase = new UploadDocumentUseCase();
const uploadDocumentController = new UploadDocumentController(uploadDocumentUseCase);

export { uploadDocumentController, uploadDocumentUseCase };