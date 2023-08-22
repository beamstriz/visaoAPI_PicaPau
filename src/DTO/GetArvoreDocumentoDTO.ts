export interface IGetArvoreDocumentoDTO {
    cookie: string
    nup: string;
    chave: string;
    tarefa_id: string;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     GetArvoreDocumentoDTO:
 *       type: object
 *       required:
 *         - nup
 *         - chave
 *         - tarefa_id
 *       properties:
 *         cookie:
 *           type: string
 *           description: coookie de acesso do sapiens
 *         nup:
 *           type: string
 *           description: nup do processo
 *         chave:
 *           type: string
 *           description: chave da terfa
 *         tarefa_id:
 *           type: string
 *           description: id da tarefa do processo
 *       example:
 *         cookie: djnakjfdnads
 *         nup: '1234'
 *         tarefa_id: '1234'
 *         chave: 'Joao Gomes'
 * */
