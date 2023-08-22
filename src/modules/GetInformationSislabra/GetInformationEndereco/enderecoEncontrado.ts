export class Endereco{
  async handle(StringSislabra: String, CpfAutor: any): Promise<Array<boolean>>{
      const novaStringSislabra = StringSislabra.replace(/\s{3,}/g, ",");
      let ocorrenciasSP: Array<number> = [];
      const novaStringEndereço = novaStringSislabra.split("Endereços Encontrados");
      const novaStringEndereçoAtualizado = novaStringEndereço[1].split("Dados Cadastrais");
      let indiceSP = novaStringSislabra.indexOf("SP")
      while (indiceSP >= 0) {
          ocorrenciasSP.push(indiceSP);
          indiceSP = novaStringSislabra.indexOf("SP", indiceSP + 1);
      }

      if(novaStringSislabra.indexOf("Endereços Encontrados - Nenhum dado encontrado") != -1){
          return [];
      }
      
      const ocorrenciasCpfAutor: Array<any> = [];
      let indiceCpf =  novaStringSislabra.indexOf(CpfAutor);
              while ( indiceCpf >= 0) {
                  ocorrenciasCpfAutor.push(indiceCpf);
                  indiceCpf = novaStringSislabra.indexOf(CpfAutor,  indiceCpf + 1);
              }

      
      const str = novaStringEndereçoAtualizado[0];
      const regex = /\d+SP/g;
      const matches = str.match(regex);
      if(matches== null){
          return [];
      }else if (matches) {
          for (const match of matches) {
            console.log("Match: "+match);
            const index = match.search(/[a-zA-Z]/)
            if (index !== -1) {
              const sp =match.slice(index); // extrai a substring a partir do primeiro caractere não-numérico
              if(ocorrenciasCpfAutor.length>1){
                  return [true, true]
              }else{
                return [true];
              }
              
            }
            return [];
          }
        }
      


      //console.log(novaStringEndereçoAtualizado[0])
      //console.log("Indice SP: " +ocorrenciasSP)
    }
}
