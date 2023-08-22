import { getXPathText } from "../../../helps/GetTextoPorXPATH";
import { converterDatasParaDate } from "../../../helps/TransformarStringParaFormatoDate";
import { ordenarDatas } from "../../../helps/BuscarDatasEmString";
import { verificarDataNoPeriodoDeDezesseisAnos } from "../../../helps/VerificarDataNoPeriodoDosdezeseisAnos";

//Estrutura para identificar data de emprego
export class DataPrevidenciarias{
    async Previdenciarias(dataAtual: Date, dataMenosdezesseis: Date, parginaDosPrevFormatada: any): Promise<boolean>{
        let tamanhoColunaPrevidenciarias = 2;
    let verificarWhilePrevidenciarias = true;
    while(verificarWhilePrevidenciarias){
        if(typeof (getXPathText(parginaDosPrevFormatada, `/html/body/div/div[4]/table/tbody/tr[${tamanhoColunaPrevidenciarias}]`)) == 'object'){
            verificarWhilePrevidenciarias = false; 
            break;
        }
        tamanhoColunaPrevidenciarias++;
    }
                            
    for(let p=2; p<tamanhoColunaPrevidenciarias; p++){
        if(typeof (getXPathText(parginaDosPrevFormatada,`/html/body/div/div[4]/table/tbody/tr[${p}]`)) === 'string'){
        const xpathColunaPrevidenciarias = `/html/body/div/div[4]/table/tbody/tr[${p}]`;
        const xpathCoulaFormatadoPrevidenciarias: string = getXPathText(parginaDosPrevFormatada, xpathColunaPrevidenciarias);
            if(xpathCoulaFormatadoPrevidenciarias.indexOf("Empregado") !== -1 || xpathCoulaFormatadoPrevidenciarias.indexOf("Contribuinte Individual") !== -1){
                    const datasEmprego = converterDatasParaDate(ordenarDatas(getXPathText(parginaDosPrevFormatada, xpathColunaPrevidenciarias))); 
                    //console.log(dataAtual, dataMenosdezesseis, datasEmprego[0], datasEmprego[1])            
                    const impeditivoBoolean = verificarDataNoPeriodoDeDezesseisAnos(dataAtual, dataMenosdezesseis, datasEmprego[0], datasEmprego[1]);
                    //console.log(impeditivoBoolean)
                        if(impeditivoBoolean){
                            return true;
                        }
            }
            
                                    
        }
    }
    return false;
    }
    
}
    
                        