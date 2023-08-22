
import { getUsuarioUseCase } from '../GetUsuario';
import { loginUseCase } from '../LoginUsuario';
import { getTarefaUseCase } from '../GetTarefa';
import { uploadDocumentUseCase } from '../UploadDocument';
import { createDocumentoUseCase } from '../CreateDocumento';
import { updateTarefaUseCase } from '../UpdateTarefa';
import { IInserirMemoriaCalculoDTO } from '../../DTO/InserirMemoriaCalculoDTO';
import { updateEtiquetaUseCase } from '../UpdateEtiqueta';


export class InsertSapiensMinutasUseCase {

    async execute(data: IInserirMemoriaCalculoDTO): Promise<any> {
        const cookie = await loginUseCase.execute(data.login);
        const usuario = (await getUsuarioUseCase.execute(cookie));
        const usuario_id = `${usuario[0].id}`;
       
        const usuario_nome = `${usuario[0].nome}`;
        var tidNumber = 3;
        const minutas = data.minutas;
        let response: Array<any> = [];
        console.log("data.etiqueta", data.etiqueta, "usuario_id", usuario_id);
        const tarefas = await getTarefaUseCase.execute({ cookie, usuario_id, etiqueta: data.etiqueta})
        //console.log(tarefas[0].pasta.processoJudicial.numero);

        for (var i = 0; i < tarefas.length; i++) {
            console.log("i tarefas anexar: " + i);
            console.log(tarefas[i])
            var processo: string;
            for (let j = 0; j < tarefas[i].pasta.interessados.length ; j++) {
                if((tarefas[i].pasta.interessados[j].pessoa.nome !== "MINIST�RIO P�BLICO fEDERAL (PROCURADORIA)" && 
                tarefas[i].pasta.interessados[j].pessoa.nome !== "MINISTERIO PUBLICO FEDERAL (PROCURADORIA)" &&
                tarefas[i].pasta.interessados[j].pessoa.nome !== "CENTRAL DE ANÁLISE DE BENEFÍCIO - CEAB/INSS" &&
                        tarefas[i].pasta.interessados[j].pessoa.nome !== "INSTITUTO NACIONAL DO SEGURO SOCIAL-INSS" &&
                        tarefas[i].pasta.interessados[j].pessoa.nome !== "INSTITUTO NACIONAL DO SEGURO SOCIAL - INSS")){
                            processo = tarefas[i].pasta.interessados[j].pessoa.nome
                            break;
                }
            }
            
            const tarefa_id = `${tarefas[i].id}`;
            const pasta_id = `${tarefas[i].pasta.id}`;
            const usuario_setor = `${tarefas[i].setorResponsavel_id}`
            const tid = `${tidNumber}`;
            tarefas[i].postIt = "MEMÓRIA DE CALCULO INSERIDA NA MINUTA";
            tarefas[i].tid = tidNumber;

            const processoAfazer = minutas.find(minuta => minuta.numeroprocesso == processo);

            if (processoAfazer != null) {
                console.log("CONTEUDO LENG", processoAfazer.conteudo.length);
                const createDocument = await createDocumentoUseCase.execute({ cookie, usuario_nome, usuario_setor, tarefa_id, pasta_id, tid })
                let documento_id = createDocument[0].id;
                // o 1344 é a intificação da memoria de calculo
                const tipo_documento = "1344"
                let nome = await processo.split(" ");
                const upload = await uploadDocumentUseCase.execute(cookie, `${nome[0]}${documento_id}MemoriaCalculo.html`, processoAfazer.conteudo, documento_id, tipo_documento);
                await response.push({ createDocument: createDocument[0], upload });
                (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "MEMORIA ANEXADA", tarefaId: parseInt(tarefa_id) }));
                tidNumber++;
            }

            if (i == tarefas.length - 1) {
                return response
            }

            
        }

    }
}