export interface IBeneficiosAcumuladoForCalculeDTO { 
    dib: string, 
    dcb: string, 
    beneficio: string, 
    rmi: string 
}

/**
 * @swagger
 * components:
 *   schemas:
 *     BeneficiosAcumuladoForCalcule:
 *       type: object
 *       required:
 *         - dib
 *         - dcb
 *         - beneficio
 *         - rmi
 *       properties:
 *         dib:
 *           type: string
 *           description: dib do benefico acumulado
 *         dcb:
 *           type: string
 *           description: dcbdo benefico acumulado
 *         beneficio:
 *           type: string
 *           description: tipo do benefico acumulado
 *         rmi:
 *           type: number
 *           description: rmi do benefico acumulado
 *       example:
 *         dib: '10/10/2018'
 *         dcb: '12/09/2021'
 *         beneficio: 'Seguro desemprego'
 *         rmi: 1245
 * */