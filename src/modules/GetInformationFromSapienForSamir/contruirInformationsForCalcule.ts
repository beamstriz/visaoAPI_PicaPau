import { IBeneficiosAcumuladoForCalculeDTO } from "../../DTO/BeneficiosAcumuladoForCalcule";
import { IBeneficiosDTO } from "../../DTO/BeneficiosDTO";
import { IInformationsForCalculeDTO } from "../../DTO/InformationsForCalcule";

export async function fazerInformationsForCalculeDTO(beneficios: IBeneficiosDTO[], numeroDoProcesso: string, dataAjuizamento: string, nome: string, cpf: string, urlProcesso: string, citacao: string, id: number): Promise<IInformationsForCalculeDTO> {
    var result: IInformationsForCalculeDTO = { beneficio: "", dibAnterior: "", beneficioAcumuladoBoolean: false, dibInicial: "", dip: "", id: id, nb: "", rmi: "", tipo: "", numeroDoProcesso, dataAjuizamento, nome, cpf, urlProcesso, citacao };
    result = await preencherBeneficioPrincipal(result, beneficios[0])
    for (let beneficio of beneficios) {
        if(beneficio.nb == result.nb){
            continue
        }
        const beneficioPrincipalNaoEAtivo_Mas_BeneficioPesquisadoSim = result.tipo !=  "ATIVO" && beneficio.tipo == "ATIVO";
        const beneficiosComMesmoTipo_Porem__BeneficosPesquisadoTem_Dib_Diferente_DIP = result.tipo == beneficio.tipo && beneficio.dip != beneficio.dib
        if(beneficioPrincipalNaoEAtivo_Mas_BeneficioPesquisadoSim || beneficiosComMesmoTipo_Porem__BeneficosPesquisadoTem_Dib_Diferente_DIP){
            result = preencherBeneficioPrincipal(result, beneficio);
        }
    }
    beneficios = beneficios.filter(beneficios =>beneficios.nb != result.nb)
    const beneficiosAcumulados: IBeneficiosAcumuladoForCalculeDTO[] = await converterArrayDeBenefiosParaArrayDeBeneficiosAcumulados(beneficios);
    result.beneficiosAcumulados = beneficiosAcumulados;
    result.beneficioAcumuladoBoolean = beneficiosAcumulados.length > 0;
    return await result
}
function preencherBeneficioPrincipal(result: IInformationsForCalculeDTO, beneficio: IBeneficiosDTO): IInformationsForCalculeDTO {
    result.beneficio = beneficio.beneficio
    result.dip = beneficio.dip
    result.dibInicial = beneficio.dib
    result.dibFinal = beneficio.dcb
    result.dibAnterior = beneficio.dibAnterior
    result.rmi = beneficio.rmi
    result.nb = beneficio.nb
    result.tipo = beneficio.tipo

    return  result
}
async function converterArrayDeBenefiosParaArrayDeBeneficiosAcumulados(beneficios: IBeneficiosDTO[]): Promise<IBeneficiosAcumuladoForCalculeDTO[]>{
    var beneficiosAcumulados: IBeneficiosAcumuladoForCalculeDTO[] = [];
    for(let beneficio of beneficios){
        beneficiosAcumulados.push({ beneficio: beneficio.beneficio, dcb: beneficio.dcb, dib: beneficio.dib, rmi: beneficio.rmi })
    }
    return await beneficiosAcumulados;
}