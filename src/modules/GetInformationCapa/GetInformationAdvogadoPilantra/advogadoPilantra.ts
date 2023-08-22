/* export function advogadoPilantra(nome: string){
    if(nome=="SABRINADEPONTESARAUJO"){
        return true;
    }else if(nome=="ADRIANO GOMES DE DEUS"){
        return true;
    }else if(nome==""){

    }
    return false;
} */


export class Advogados{
    async AdvogadoPilantra(capaHTML: any): Promise<boolean>{
    const arrayAdvogadosPilantra: Array<string> = ["SABRINA DE PONTES ARAUJO", "ADRIANO GOMES DE DEUS","ANDERSON JOSÉ LOPES FRANCO", "EDER NILSON VIANA DA SILVA", "EUCLIDES RABELO ALENCAR", "EVANDRO SOUZA MUNIZ", "FRANKLIN DAYWISON JAQUES", "ESCRITÓRIO ADVOCACIA CAVALCANTE & MONT SERRAT", "GUILHERME HENRIQUE BRANCO DE OLIVEIRA", "ITALO BENEDITO DA CRUZ MAGALHÃES", "JOÃO PAULO DE LIMA SILVA", "KELLY JAMILLY DE OLIVEIRA FERREIRA", "RAYMUNDO MAURÍCIO PINTO JÚNIOR", "RONALDO DIAS CAVALCANTE", "SABRINA PONTES DE ARAÚJO","SILANY SOARES ASSIS","TARCÍSIO SAMPAIO DA SILVA","WENNYSON DA SILVA CARDOSO","WILLIAM VIANA DA SILVA"];
    for(let i=0; i<arrayAdvogadosPilantra.length; i++){
        //console.log(arrayAdvogadosPilantra[i])
        if((capaHTML.indexOf(arrayAdvogadosPilantra[i])) !== -1){
            return false;
        }
    }
    return true;
    }
}


/* const arrayAdvogadosPilantra: Array<string> = ["SABRINA DE PONTES ARAUJO", "ADRIANO GOMES DE DEUS","ANDERSON JOSÉ LOPES FRANCO", "EDER NILSON VIANA DA SILVA", "EUCLIDES RABELO ALENCAR", "EVANDRO SOUZA MUNIZ", "FRANKLIN DAYWISON JAQUES", "ESCRITÓRIO ADVOCACIA CAVALCANTE & MONT SERRAT", "GUILHERME HENRIQUE BRANCO DE OLIVEIRA", "ITALO BENEDITO DA CRUZ MAGALHÃES", "JOÃO PAULO DE LIMA SILVA", "KELLY JAMILLY DE OLIVEIRA FERREIRA", "RAYMUNDO MAURÍCIO PINTO JÚNIOR", "RONALDO DIAS CAVALCANTE", "SABRINA PONTES DE ARAÚJO","SILANY SOARES ASSIS","TARCÍSIO SAMPAIO DA SILVA","WENNYSON DA SILVA CARDOSO","WILLIAM VIANA DA SILVA"];
export function advogadoPilantra(capaHTML: any):boolean{
    for(let i=0; i<arrayAdvogadosPilantra.length; i++){
        console.log(arrayAdvogadosPilantra[i])
        if((capaHTML.indexOf(arrayAdvogadosPilantra[i])) !== -1){
            return false;
        }
    }
    return true;
} */