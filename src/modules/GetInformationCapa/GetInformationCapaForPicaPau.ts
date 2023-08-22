import { advogados } from "./GetInformationAdvogadoPilantra";
import { Advogados } from "./GetInformationAdvogadoPilantra/advogadoPilantra";
/* import { calcularIdade } from "./GetInformationIdade";
import { CalcularIdade } from "./GetInformationIdade/calcularIdade"; */




export class InformationForPicaPau{
    constructor(advogadosObj: Advogados){};
    async Impedimentos(capaHTML: any): Promise<Array<String>>{
        const arrayImpedimentos = [];
        //Estrutura para identificar nome dos Advogados
        const verificarAdvogadoBoolean = await advogados.AdvogadoPilantra(capaHTML);
        if(!verificarAdvogadoBoolean){
            arrayImpedimentos.push("ADVOGADO");
        }


        return arrayImpedimentos;


    }


}




//export {IdentificarAdvogadoPilantra, VerificarIdadeCapa}
