import { IBeneficiosAcumuladoForCalculeDTO } from "./BeneficiosAcumuladoForCalcule";

export interface IInformationsForCalculeDTO {
    id: number,
    numeroDoProcesso: string,
    nome: string,
    dataAjuizamento: string,
    cpf: string,
    dibInicial: string,
    dibFinal?: string,
    rmi: string,
    beneficio: string,
    nb: string,
    dip: string,
    aps?: string,
    citacao?: string,
    beneficiosAcumulados?: IBeneficiosAcumuladoForCalculeDTO[],
    urlProcesso: string,
    dibAnterior: string,
    beneficioAcumuladoBoolean: boolean,
    tipo: string
  }
/**
 * @swagger
 * components:
 *   schemas:
 *     InformationsForCalcule:
 *       type: object
 *       required:
 *         - id
 *         - nome
 *         - numeroDoProcesso
 *         - dataAjuizamento
 *         - cpf
 *         - dibInicial
 *         - rmi
 *         - beneficio
 *         - nb
 *         - dip
 *         - citacao
 *         - urlProcesso
 *         - tipo
 *       properties:
 *         id:
 *           type: number
 *           description: id da tarefa do sapiens
 *         nome:
 *           type: string
 *           description: nome do autor do processo
 *         numeroDoProcesso:
 *           type: string
 *           description: Numero Do Processo
 *         dataAjuizamento:
 *           type: string
 *           description: data de ajuizamento
 *         cpf:
 *           type: string
 *           description: cpf do autor do processo
 *         dibInicial:
 *           type: string
 *           description: dibInicial do processo
 *         dibFinal:
 *           type: string
 *           description: data final do beneficio
 *         rmi:
 *           type: number
 *           description: rmi do beneficio
 *         beneficio:
 *           type: string
 *           description: tipo do beneficio e nome
 *         nb:
 *           type: string
 *           description: numero do beneficio
 *         dip:
 *           type: string
 *           description: data de inicio de pagamento 
 *         aps:
 *           type: string
 *           description: local onde processo traminta
 *         citacao:
 *           type: string
 *           description: data da citaco 
 *         beneficiosAcumulados:
 *           type: array
 *           description: array de beneficio acumulado 
 *           items: 
 *              $ref: '#/components/schemas/BeneficiosAcumuladoForCalcule'
 *         urlProcesso:
 *           type: string
 *           description: url do Processo do sapiens
 *         dibAnterior:
 *           type: string
 *           description: dib Anterior
 *         beneficioAcumuladoBoolean:
 *           type: boolean
 *           description: existe beneficio acumulado
 *         tipo:
 *           type: string
 *           description: qual tipo do beneficio (Ativo ou Cessado)
 *       example:
 *        id: 3802191
 *        numeroDoProcesso: '123456'
 *        nome: 'João da Silva'
 *        dataAjuizamento: '2020-01-01'
 *        cpf: '123.456.789-00'
 *        dibInicial: '2022-01-01'
 *        dibFinal: '2022-01-31'
 *        rmi: '2000.00'
 *        beneficio: 'auxílio-doença'
 *        nb: '987654'
 *        dip: '2022-01-15'
 *        aps: 'Tribunal de Justiça do Estado de São Paulo'
 *        citacao: '2022-01-01'
 *        urlProcesso: 'https://sapiens.com.br/processo/123456'
 *        dibAnterior: '2021-12-31'
 *        tipo: 'Ativo'
 * */