import { IInserirMemoriaCalculoDTO } from "../../DTO/InserirMemoriaCalculoDTO";
import { createDocumentoUseCase } from "../CreateDocumento";
import { getTarefaUseCase } from "../GetTarefa";
import { getUsuarioUseCase } from "../GetUsuario";
import { loginUseCase } from "../LoginUsuario";
import { uploadDocumentUseCase } from "../UploadDocument";

export class RequestInformationForSamir {

    async execute(data: IInserirMemoriaCalculoDTO): Promise<any> {
        const cookie = await loginUseCase.execute(data.login);
        const usuario = (await getUsuarioUseCase.execute(cookie));

        const usuario_id = `${usuario[0].id}`;
        const usuario_nome = `${usuario[0].nome}`;
        var tidNumber = 3;
        const minutas = data.minutas;
        let response: Array<any> = [];
        const tarefas = await getTarefaUseCase.execute({ cookie, usuario_id, etiqueta: data.etiqueta, processoJudicial: data.minutas[0].numeroprocesso })

        const processo: string = tarefas[0].pasta.processoJudicial.numero;
        console.log(processo, tarefas.length);
        const tarefa_id = `${tarefas[0].id}`;
        const pasta_id = `${tarefas[0].pasta.id}`;
        const processo_setor = `${tarefas[0].setorResponsavel_id}`
        const tid = `${tidNumber}`;
        tarefas[0].postIt = "MEMÓRIA DE CALCULO INSERIDA NA MINUTA";
        tarefas[0].tid = tidNumber;

        const processoAfazer = minutas.find(minuta => minuta.numeroprocesso == processo);
        if (processoAfazer != null) {
            const createDocument = await createDocumentoUseCase.execute({ cookie, usuario_nome, usuario_setor: processo_setor, tarefa_id, pasta_id, tid })

            let documento_id = createDocument[0].id;
            const tipo_documento = "1344"

            const upload = await uploadDocumentUseCase.execute(cookie, `${processo}MemoriaCalculo.html`, processoAfazer.conteudo, documento_id, tipo_documento);
            await response.push({ createDocument: createDocument[0], upload });
        }

        
            return response

    }
}