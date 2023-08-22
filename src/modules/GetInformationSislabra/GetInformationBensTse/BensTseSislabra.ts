export class DoacoesTse{
    async handle(StringSislabra: String, cpfAutor: string): Promise<any>{
        const ocorrenciasCpfAutor: Array<any> = [];
        const novaSislabra = StringSislabra.replace(/\s{3,}/g, ",");


        let indiceCpf =  novaSislabra.indexOf(cpfAutor);
        while ( indiceCpf >= 0) {
            ocorrenciasCpfAutor.push(indiceCpf);
            indiceCpf = novaSislabra.indexOf(cpfAutor,  indiceCpf + 1);
        }



        if(novaSislabra.indexOf("Bens Declarados ao TSE (Candidato) - Nenhum dado encontrado") != -1){
            return []
        }else{
            if(ocorrenciasCpfAutor.length>1){
            return [true, true];
            }else{
                return [true]
            }
        }

    }
}