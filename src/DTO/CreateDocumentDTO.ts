export interface ICreateDocumentDTO {
    cookie: string
    pasta_id: string;
    usuario_nome: string
    usuario_setor: string;
    tarefa_id: string;
    tid: string;
    tipoDocumento_id?: string;
    modelo_id?: string;
}
/**
* @swagger
* components:
*   schemas:
*     CreateDocumentDTO:
*       type: object
*       required:
*         - pasta_id
*         - usuario_nome
*         - usuario_setor
*         - tarefa_id
*         - tid
*       properties:
*         cookie:
*           type: string
*           description: coookie de acesso do sapiens
*         pasta_id:
*           type: string
*           description: Id da pasta do processo
*         usuario_nome:
*           type: string
*           description: nome do da pessoa que ta criando o documento
*         usuario_setor:
*           type: string
*           description: setor da pessoa que ta criando o documento
*         tarefa_id:
*           type: string
*           description: id da tarefa do processo
*         tid:
*           type: string
*           description: contador de quantidade de request do sapiens
*         tipoDocumento_id:
*           type: string
*           description: tipo do documnto a ser criado, memoria de calculo é 1344
*         modelo_id:
*           type: string
*           description: modelo do documento a ser criado quaso exista no sapiens
*       example:
*         usuario_setor: '12733'
*         pasta_id: '1234'
*         modelo_id: '1234'
*         tipoDocumento_id: '1344'
*         tid: '5'
*         tarefa_id: '1234'
*         usuario_nome: 'Emma White'
* */
