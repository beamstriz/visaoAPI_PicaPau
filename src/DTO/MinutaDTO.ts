export interface IMinutasDTO {
    numeroprocesso: string, 
    conteudo: string
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Minutas:
 *       type: object
 *       required:
 *         - numeroprocesso
 *         - conteudo
 *       properties:
 *         numeroprocesso:
 *           type: string
 *           description: etiqueta do processo
 *         conteudo:
 *           type: string
 *           description: conteudo da minuta (memoria do Calculo)
 *       example:
 *         numeroprocesso: "1000101"
 *         conteudo: "bhhmcasDD"
 * */