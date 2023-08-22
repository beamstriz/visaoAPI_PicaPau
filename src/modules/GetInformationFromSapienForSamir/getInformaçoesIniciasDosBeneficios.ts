import { IBeneficiosDTO } from "../../DTO/BeneficiosDTO";
import { correçaoDoErroDeFormatoDoSapiens } from "../../helps/CorreçaoDoErroDeFormatoDoSapiens";
import { getXPathText } from "../../helps/GetTextoPorXPATH";

export async function  getInformaçoesIniciasDosBeneficios(paginaHTML_DOSPREV_Formatada: any): Promise<IBeneficiosDTO[]> {
    const result: IBeneficiosDTO[] = [];
    const valorMaximoparaPecoorerALinha = 20;
    const valorDaLinhaInicial = 2;
    for (let indexDaLinha = valorDaLinhaInicial; indexDaLinha <= valorMaximoparaPecoorerALinha; indexDaLinha++) {
        const xpathDaLinhaParaOElementoTipo = "/html/body/div/div[3]/table/tbody/tr[" + indexDaLinha + "]/td[6]";
        const tipo = getXPathText(paginaHTML_DOSPREV_Formatada, xpathDaLinhaParaOElementoTipo);
        const tipoNaoEncontrado = tipo == null;
        if (tipoNaoEncontrado) {
            const lidoTodosOsBeneficios = result.length > 0;
            if (lidoTodosOsBeneficios) {
                break;
            } else {
                continue
            }
        }
        const verificaçaoDaInValidadeDoTipo = !(tipo == "ATIVO" || tipo == "CESSADO");
        if (verificaçaoDaInValidadeDoTipo) {
            continue
        }
        const xpathDaLinhaParaOElementoNB = "/html/body/div/div[3]/table/tbody/tr[" + indexDaLinha + "]/td[1]"
        const nb = getXPathText(paginaHTML_DOSPREV_Formatada, xpathDaLinhaParaOElementoNB)

        const xpathDaLinhaParaOElementoBeneficio = "/html/body/div/div[3]/table//tr[" + indexDaLinha + "]/td[2]"
        const beneficio = getXPathText(paginaHTML_DOSPREV_Formatada, xpathDaLinhaParaOElementoBeneficio)

        const xpathDaLinhaParaOElementoDIB = "/html/body/div/div[3]/table/tbody/tr[" + indexDaLinha + "]/td[4]"
        const dib = correçaoDoErroDeFormatoDoSapiens(getXPathText(paginaHTML_DOSPREV_Formatada, xpathDaLinhaParaOElementoDIB));

        const xpathDaLinhaParaOElementoDCB = "/html/body/div/div[3]/table/tbody/tr[" + indexDaLinha + "]/td[5]"
        const dcb = correçaoDoErroDeFormatoDoSapiens(getXPathText(paginaHTML_DOSPREV_Formatada, xpathDaLinhaParaOElementoDCB));
        // console.log({ tipo, nb, beneficio, dib, dcb });
        result.push({ tipo, nb, beneficio, dib, dcb });

    }
    return await result;
}