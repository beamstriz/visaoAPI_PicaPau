export class Veiculo{
    async hundle(StringSislabra: String, cpfAutor: any): Promise<Array<any>>{
        const ArrayVerificarAutor: Array<any> = []
        const ocorrenciasRenavam: Array<number> = [];
        const ocorrenciasMotoneta: Array<number> = [];
        const ocorrenciasMotocicleta: Array<number> = [];
        const ocorrenciasCpfAutor: Array<number> = [];

        const novaStringSislabra = StringSislabra.replace(/\s{3,}/g, ",");
        const novaStringparaAcharNome = novaStringSislabra.split("CPF")
        let indiceCpf =  novaStringSislabra.indexOf(cpfAutor);
        

        let indiceRenavan = novaStringSislabra.indexOf("Renavam")
        let indiceMotoneta = novaStringSislabra.indexOf("MOTONETA")
        let indiceMotocicleta = novaStringSislabra.indexOf("MOTOCICLETA")
        //let indiceCpf =  novaStringSislabra.indexOf(procurarComCpf);

        while (indiceRenavan >= 0) {
            ocorrenciasRenavam.push(indiceRenavan);
            indiceRenavan = novaStringSislabra.indexOf("Renavam", indiceRenavan + 1);
        }
        while (indiceMotoneta >= 0) {
            ocorrenciasMotoneta.push(indiceMotoneta);
            indiceMotoneta = novaStringSislabra.indexOf("MOTONETA", indiceMotoneta + 1);
        }
        while (indiceMotocicleta >= 0) {
            ocorrenciasMotocicleta.push(indiceMotocicleta);
            indiceMotocicleta = novaStringSislabra.indexOf("MOTOCICLETA",indiceMotocicleta + 1);
        }
        while (indiceCpf >= 0) {
            ocorrenciasCpfAutor.push(indiceCpf);
            indiceCpf = novaStringSislabra.indexOf(cpfAutor,indiceCpf + 1);
        }
        const motonetaMaisMotocicleta =  ocorrenciasMotocicleta.length + ocorrenciasMotoneta.length;
        /* console.log(novaStringparaAcharNome[1])
        console.log("&&&&&&&")
        console.log(novaStringparaAcharNome[2]) */
        /* console.log("&&&&&&&")
        console.log(StringSislabra)
        console.log("cpf: " + procurarComCpf)
        console.log("Autor " + ocorrenciasCpfAutor) */
        if(ocorrenciasMotoneta.length == ocorrenciasRenavam.length || novaStringSislabra.indexOf("Veículos Vinculados - Nenhum dado encontrado") != -1 || ocorrenciasRenavam.length == motonetaMaisMotocicleta){
            return [];
        }else{
            if(ocorrenciasCpfAutor.length > 1){
                console.log("CARRO")
                return [true, true]
            }
            return [true]
        }

        }
}
