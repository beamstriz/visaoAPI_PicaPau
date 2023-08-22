const fs = require("fs");
import { error } from "console";
import { lePdf } from "../../GetPdfSislabra/GetPdfSislabra/HeadPdf";
export class Emprego{
    async handle(StringSislabra: String, cpfAutor: any): Promise</* Array<boolean> */ any>{
        
        function extrairDados(texto): Array<any> {
            const padrao = /\d{2}\/\d{2}\/\d{4}[^]*?(?=\d{2}\/\d{2}\/\d{4}|\b[a-zA-Z]+\b|$)/g;
            const matches = texto.matchAll(padrao);
            const dados: Array<any> = [];
          
            for (const match of matches) {
              dados.push(match[0].trim());
            }
          
            return dados;
          }
          

          function formatarValor(valor) {
            const padraoData = /^\d{2}\/\d{2}\/\d{4}/; // Expressão regular para verificar o padrão de data
            const valorSemData = valor.replace(padraoData, '').trim();
            return valorSemData;
          }
          
        const ocorrenciasCpfAutor: Array<any> = [];
        const novaSislabra = StringSislabra.replace(/\s{3,}/g, ",");

        let indiceCpf =  novaSislabra.indexOf(cpfAutor);
        while ( indiceCpf >= 0) {
            ocorrenciasCpfAutor.push(indiceCpf);
            indiceCpf = novaSislabra.indexOf(cpfAutor,  indiceCpf + 1);
        }

        
            
            
            const valores = await lePdf();
            console.log("valores: " + valores)
            if(valores == null){
                return [];
            }
            
           /*  console.log("#$$$$$$$$$$$$")
            console.log(typeof(valores))
            console.log(valores)
            console.log(valores[0])
            console.log(typeof(valores[0])) */
            for(let j=0; j<valores.length; j++){
                
                if(parseFloat(valores[j].replace(".","").replace(",","."))>3000){    
                    if(ocorrenciasCpfAutor.length>1){
                        return [true, true];
                        }else{
                            return [true]
                        }
                }
            }
            
        return [];


        
        }
}

