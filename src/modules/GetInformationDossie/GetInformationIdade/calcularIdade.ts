import { correçaoDoErroDeFormatoDoSapiens } from "../../../helps/CorreçaoDoErroDeFormatoDoSapiens";
import { getXPathText } from "../../../helps/GetTextoPorXPATH";

export class CalcularIdade{
    async calcIdade(parginaDosPrevFormatada: any): Promise<any>{
        const dataNascXpath: string = "/html/body/div/div[1]/table/tbody/tr[8]/td/text()";
        const dataAjuizXpath: string = "/html/body/div/div[1]/table/tbody/tr[2]/td";
        const generoXptah: string = "/html/body/div/div[1]/table/tbody/tr[11]/td"
        const dataAjuizFormatado: string = correçaoDoErroDeFormatoDoSapiens(getXPathText(parginaDosPrevFormatada, dataAjuizXpath));
        const dataNascFormatado: string = correçaoDoErroDeFormatoDoSapiens(getXPathText(parginaDosPrevFormatada, dataNascXpath));
        const generoFormatado: string = correçaoDoErroDeFormatoDoSapiens(getXPathText(parginaDosPrevFormatada, generoXptah));;
        /* console.log("Tipo " + typeof(generoFormatado))
        console.log("Genero:" + generoFormatado + "Genero:");
        console.log("Verificar Vazio: " + (generoFormatado.length == 0)) */
        if(generoFormatado.length == 0){
            console.log("entrou idade vazia")
            return []
            
        }
        let dataAjuizArray = dataAjuizFormatado.split("/");
        let year = parseFloat(dataAjuizArray[2])
        let month = parseFloat(dataAjuizArray[1])
        let day = parseFloat(dataAjuizArray[0])


        var d = new Date,
            ano_atual = year,
            mes_atual = month + 1,
            dia_atual = day,
            split = dataNascFormatado.split('/'),
            novadata = split[1] + "/" +split[0]+"/"+split[2],
            data_americana = new Date(novadata),
            vAno = data_americana.getFullYear(),
            vMes = data_americana.getMonth() + 1,
            vDia = data_americana.getDate(),
            ano_aniversario = +vAno,
            mes_aniversario = +vMes,
            dia_aniversario = +vDia,
            quantos_anos = ano_atual - ano_aniversario;
        if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
            quantos_anos--;
        }
        const idade = quantos_anos < 0 ? 0 : quantos_anos;
        if(generoFormatado==="MASCULINO" && idade >= 60){
            return [true];
        }

        if(generoFormatado==="FEMININO" && idade >= 55){
            return [true];
        }

        return [false];
        
    }

}
