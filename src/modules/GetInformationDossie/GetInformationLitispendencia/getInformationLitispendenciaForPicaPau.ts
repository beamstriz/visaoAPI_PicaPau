 //Verificar litispedência      
 import { getXPathText } from "../../../helps/GetTextoPorXPATH";                                                 



export class Litispedencia{
    async funcLitis(parginaDosPrevFormatada: any): Promise<boolean>{
        const xpathRelacaoProcesso = "/html/body/div/div[2]/table/tbody/tr[2]/td";                   
        const xpathRelacaoProcessoFormatada: string = (getXPathText(parginaDosPrevFormatada, xpathRelacaoProcesso).trim());
        const StringParaVerificar: string = "Não há relação dos processos movidos pelo autor contra o INSS.";
        const xpathRelacaoProcessoMovidosFormatada:boolean = xpathRelacaoProcessoFormatada===StringParaVerificar;
        return xpathRelacaoProcessoMovidosFormatada;
        
    }
    
}

