export class Empresa{
    async hundle(StringSislabra: String, ProcurarCpfAutor: string): Promise<Array<boolean>>{
        const ArrayVerificarAutor: Array<any> = []
            const ocorrenciasCpfAutor: Array<any> = [];
            let verificarDoisAutor: number = 0;
            const novaSislabra = StringSislabra.replace(/\s{3,}/g, ",");
            const novaStringparaAcharNome = novaSislabra.split("CPF")
            let indiceCpf =  novaSislabra.indexOf(ProcurarCpfAutor);
            while ( indiceCpf >= 0) {
                ocorrenciasCpfAutor.push(indiceCpf);
                indiceCpf = novaSislabra.indexOf(ProcurarCpfAutor,  indiceCpf + 1);
            }
            //console.log(ocorrenciasCpfAutor);

        if(StringSislabra.indexOf('Situação Empresa') != -1){
            //console.log(novaStringparaAcharNome[2].indexOf(ProcurarNomeAutor))
            /* if(novaStringparaAcharNome[1].indexOf(ProcurarCpfAutor) != -1 || novaStringparaAcharNome[2].indexOf(ProcurarCpfAutor) != -1){ */
            if(ocorrenciasCpfAutor.length>1){
                //console.log("Primeiro if")
                ArrayVerificarAutor.push(true, true, verificarDoisAutor)
                //console.log("Entrou aqui nos 2")
                return ArrayVerificarAutor
                
            }
            ArrayVerificarAutor.push(true)
            //console.log("Segundo IF")
            //console.log(ArrayVerificarAutor)
            return ArrayVerificarAutor;
            
        }
        ArrayVerificarAutor.push(false)
        //console.log("Terceiro if")
        //console.log(ArrayVerificarAutor)
        return ArrayVerificarAutor;
    }
}
