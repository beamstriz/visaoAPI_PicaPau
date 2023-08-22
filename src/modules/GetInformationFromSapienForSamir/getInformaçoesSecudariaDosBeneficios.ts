import { IBeneficiosDTO } from '../../DTO/BeneficiosDTO';
import { correçaoDoErroDeFormatoDoSapiens } from '../../helps/CorreçaoDoErroDeFormatoDoSapiens';
import { getXPathText } from "../../helps/GetTextoPorXPATH";


export async function getInformaçoesSecudariaDosBeneficios(beneficios: IBeneficiosDTO[], paginaHTML_DOSPREV_Formatada: any): Promise<IBeneficiosDTO[]> {
    const numeroMaximoParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio = 6;
    const numeroInicialParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio = 5;

    const numeroMaxioParaProcurarATabelaDoBeneeficio = 50;
    const numeroInicialParaProcurarATabelaDoBeneeficio = 1;
    for (let idexDoBeneficio = 0; idexDoBeneficio < beneficios.length; idexDoBeneficio++) {
        for (let idexDaDivParaPesquisarAtabela = numeroInicialParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio; idexDaDivParaPesquisarAtabela <= numeroMaximoParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio; idexDaDivParaPesquisarAtabela++) {
            for (let indexDaTabela = numeroInicialParaProcurarATabelaDoBeneeficio; indexDaTabela <= numeroMaxioParaProcurarATabelaDoBeneeficio; indexDaTabela++) {
                const xpathNbDaTabela = "/html/body/div/div[" + idexDaDivParaPesquisarAtabela + "]/div[" + indexDaTabela + "]/table[1]/tbody/tr[2]/td[2]"
                const nb = getXPathText(paginaHTML_DOSPREV_Formatada, xpathNbDaTabela);
                
                const divInvalidaParaPesquisa = ((nb == null));
                if (divInvalidaParaPesquisa) {
                    break;
                }
                const nb_EstaDiferenteDoBeneficio = nb != beneficios[idexDoBeneficio].nb;
                if (nb_EstaDiferenteDoBeneficio) {
                    continue
                }
                const xphatRMI = "/html/body/div/div[" + idexDaDivParaPesquisarAtabela + "]/div[" + indexDaTabela + "]/table[2]/tbody/tr[2]/td[1]"
                const rmi = correçaoDoErroDeFormatoDoSapiens(getXPathText(paginaHTML_DOSPREV_Formatada, xphatRMI))
                beneficios[idexDoBeneficio].rmi = rmi;
                const xpathDIP = "/html/body/div/div[" + idexDaDivParaPesquisarAtabela + "]/div[" + indexDaTabela + "]/table[1]/tbody/tr[2]/td[8]"
                const dip = correçaoDoErroDeFormatoDoSapiens(getXPathText(paginaHTML_DOSPREV_Formatada, xpathDIP))
                beneficios[idexDoBeneficio].dip = dip;
                const xpathDibAnterior = "/html/body/div/div[" + idexDaDivParaPesquisarAtabela + "]/div[" + indexDaTabela + "]/table[2]/tbody/tr[2]/td[6]"
                const dibAnterior = correçaoDoErroDeFormatoDoSapiens(getXPathText(paginaHTML_DOSPREV_Formatada, xpathDibAnterior))
                // console.log("dip", dip, "rmi", rmi, "dibAnterior", dibAnterior);
                beneficios[idexDoBeneficio].dibAnterior = dibAnterior;
                idexDaDivParaPesquisarAtabela = numeroMaximoParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio;
                indexDaTabela = numeroMaxioParaProcurarATabelaDoBeneeficio;
            }
        }
    }


    return await beneficios
}