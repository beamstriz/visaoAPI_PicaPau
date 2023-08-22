export interface IGetTarefaDTO {
    usuario_id: string;
    cookie: string;
    etiqueta?: string;
    processoJudicial?: string;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     GetTarefa:
 *       type: object
 *       required:
 *         - usuario_id
 *         - cookie
 *       properties:
 *         usuario_id:
 *           type: string
 *           description: usuario_id do usuario sapiens
 *         cookie:
 *           type: string
 *           description: Cookie do usuario sapiens para atetição
 *         etiqueta:
 *           type: string
 *           description: etiqueta para pesquisar
 *         processoJudicial:
 *           type: string
 *           description: processo judicial para pesquisar
 *       example:
 *         usuario_id: 3802191
 *         cookie: dcxscvssSDEBCq
 *         etiqueta: lido boot
 *         processoJudicial: 1224651
 * */