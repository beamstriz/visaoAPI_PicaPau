import { requerimentos } from "./InformatioRequerimento";
import { dataPrevidencias } from "./InformationPrevidenciarias";
import { calcularIdade } from "./GetInformationIdade";
import { litispendencia } from "./GetInformationLitispendencia";
import { seguradoEspecial } from "./GetInformationSeguradoEspecial";
import { requerimentosAtivos } from "./InformatioRequerimento";

export class GetInformationDossieForPicaPau{
    async impedimentos(paginaDosprevFormatada: any, parginaDosPrev: any): Promise<Array<string>>{
        const ArrayImpedimentos: Array<string> = [];

        try{
        const DatasAtualEMenosDezesseis: Array<Date> = await requerimentos.dataRequerimento(paginaDosprevFormatada);
        //console.log("Data Requerimento: " + DatasAtualEMenosDezesseis.length); 
        if(DatasAtualEMenosDezesseis[0] == null){
            ArrayImpedimentos.push("AUSÊNCIA DE REQUERIMENTO AUTOR")
        }else{
            const verificarDataFinal: boolean = await dataPrevidencias.Previdenciarias(DatasAtualEMenosDezesseis[0], DatasAtualEMenosDezesseis[1], paginaDosprevFormatada);
            if(verificarDataFinal){
                ArrayImpedimentos.push("EMPREGO")
        }
        }
        
        }catch{
            ArrayImpedimentos.push("VÍNCULO ABERTO")
        }
        


        const verificarIdade: Array<boolean> = await calcularIdade.calcIdade(paginaDosprevFormatada);
       if(verificarIdade.length==0){
        ArrayImpedimentos.push("IDADE INDEFINIDA")

       }else if(!verificarIdade[0] && verificarIdade.length != 0){
        ArrayImpedimentos.push("IDADE")

       }
        


        const verificarLitispedencia = await litispendencia.funcLitis(paginaDosprevFormatada);
        if(!verificarLitispedencia){   
            ArrayImpedimentos.push("LITISPENDÊNCIA")
                                             
         }

         

         const segurado =  await seguradoEspecial.handle(parginaDosPrev);
        const requerimentoAtivo: boolean = await requerimentosAtivos.handle(paginaDosprevFormatada)
         
        if(segurado !== -1 || requerimentoAtivo == true){
            ArrayImpedimentos.push("CONCESSÃO ANTERIOR")
        }

        return ArrayImpedimentos;
    }


}