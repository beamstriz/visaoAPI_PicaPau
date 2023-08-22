export function verificarDataNoPeriodoDeDezesseisAnos(dataMaisAtual: Date, dataMenosDezesseisAnos: Date, dataInicioPrevidenciarias: Date, dataFimPrevidenciarias: Date): boolean{
    if(dataInicioPrevidenciarias >= dataMenosDezesseisAnos && dataInicioPrevidenciarias <= dataMaisAtual || dataFimPrevidenciarias >= dataMenosDezesseisAnos && dataFimPrevidenciarias <= dataMaisAtual){
        //console.log("Entrou no primeiro if")
        return true;
    }else if(dataInicioPrevidenciarias < dataMenosDezesseisAnos && dataFimPrevidenciarias > dataMaisAtual){
        //console.log("Entrou no segundo if")
        return true;
    }else if(dataInicioPrevidenciarias < dataMenosDezesseisAnos && dataFimPrevidenciarias > dataMenosDezesseisAnos){
        //console.log("Entrou no terceiro if")
        return true;
    }
    return false;
}