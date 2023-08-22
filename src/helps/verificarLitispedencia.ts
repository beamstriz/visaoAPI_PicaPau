/* import { getXPathText } from "./GetTextoPorXPATH";
export function litispedencia(parginaDosPrevFormatada: any): boolean{
    let soma=0;
    let condicao = true;
    
        for(let aux = 0; condicao==true; aux++){
            const verificar = getXPathText(parginaDosPrevFormatada, `/html/body/div/div[2]/table/tbody/tr[2]/td[3]/table/tbody/tr[${aux+1}]/td/text()`).trim();
            console.log(typeof(verificar))
            console.log(typeof(verificar) == typeof(""))
            if(verificar == typeof(String)){
                soma+=1;
            }else{
                condicao=false;
            }
        }
        console.log(soma)
        console.log("Saiu do IF")
                   
    for(let i=0; i < soma; i++){
        //soma += 1
        const verificar = getXPathText(parginaDosPrevFormatada, `/html/body/div/div[2]/table/tbody/tr[2]/td[3]/table/tbody/tr[${i+1}]/td/text()`).trim()
        console.log(verificar)
        if(verificar == "INSTITUTO NACIONAL DO SEGURO SOCIAL - INSS" || verificar == "INSTITUTO NACIONAL DO SEGURO SOCIAL" || verificar == "INSS PICOS PI" || verificar == "INSS INSTITUTO NACIONAL DE SEGURIDADE SOCIAL" || verificar == "AGENCIA DA PREVIDENCIA SOCIAL SALVADOR - MERCES" || verificar == "TJMA"){
            //console.log(soma)
            //console.log(verificar)
            return true;
        }
        //console.log(`verificar:${verificar}`);
        
    } 
    //console.log(soma)
    return false;
    // === "INSTITUTO NACIONAL DO SEGURO SOCIAL - INSS" || "INSTITUTO NACIONAL DO SEGURO SOCIAL" || "INSS PICOS PI" || "INSS INSTITUTO NACIONAL DE SEGURIDADE SOCIAL" || "AGENCIA DA PREVIDENCIA SOCIAL SALVADOR - MERCES" || "TJMA";
} */