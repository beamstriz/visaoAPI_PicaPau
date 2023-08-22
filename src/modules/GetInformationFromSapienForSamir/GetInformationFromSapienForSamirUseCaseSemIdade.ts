const { JSDOM } = require('jsdom');
import { getUsuarioUseCase } from '../GetUsuario';
import { loginUseCase } from '../LoginUsuario';
import { getTarefaUseCase } from '../GetTarefa';
import { IGetInformationsFromSapiensDTO } from '../../DTO/GetInformationsFromSapiensDTO';
import { IGetArvoreDocumentoDTO } from '../../DTO/GetArvoreDocumentoDTO';
import { getArvoreDocumentoUseCase } from '../GetArvoreDocumento/index';
import { IInformationsForCalculeDTO } from '../../DTO/InformationsForCalcule';
import { getDocumentoUseCase } from '../GetDocumento';
import { updateEtiquetaUseCase } from '../UpdateEtiqueta';
import { getXPathText } from "../../helps/GetTextoPorXPATH";
import { coletarCitacao } from "./coletarCitacao";
import { VerificaçaoSeDosPrevInvalido } from "./verificaçaoSeDosPrevInvalido";
import { getInformaçoesIniciasDosBeneficios } from './getInformaçoesIniciasDosBeneficios';
import { getInformaçoesSecudariaDosBeneficios } from './getInformaçoesSecudariaDosBeneficios';
import { fazerInformationsForCalculeDTO } from './contruirInformationsForCalcule';
import { ResponseArvoreDeDocumento } from '../../sapiensOperations/response/ResponseArvoreDeDocumento';
import { coletarArvoreDeDocumentoDoPassivo } from './coletarArvoreDeDocumentoDoPassivo';
import { getCapaDoPassivaUseCase } from '../GetCapaDoPassiva';
import { correçaoDoErroDeFormatoDoSapiens } from '../../helps/CorreçaoDoErroDeFormatoDoSapiens';
import { formatoNomeAdvogadoPilantra } from '../../helps/formatoNomeAdvogadoPilantra';
//import { advogadoPilantra } from '../GetInformationCapa/advogadoPilantra';
//import { calcIdade } from '../GetInformationCapa/VerificarIdade';
//import { litispedencia } from '../../helps/verificarLitispedencia';
import { da } from 'date-fns/locale';
import {impedimentosCapa } from '../GetInformationCapa';
//import { IdentificarAdvogadoPilantra, VerificarIdadeCapa } from '../GetInformationCapa/GetInformationCapaForPicaPau';
import { extractDatesFromString } from '../../helps/FiltrarDatas';
import { encontrarDataMaisAtual } from '../../helps/VerificarDataMaisAtual';
import { ordenarDatas } from '../../helps/BuscarDatasEmString';
import { verificarDataNoPeriodoDeDezesseisAnos } from '../../helps/VerificarDataNoPeriodoDosdezeseisAnos';
import { converterDatasParaDate } from '../../helps/TransformarStringParaFormatoDate';
import { getInformationDossieForPicaPau, getInformationDossieForPicaPauSemIdade } from '../GetInformationDossie';
import { readPDF } from '../GetPdfSislabra/ReadPdf';
import { downloadPDFWithCookies,  deletePDF } from '../GetPdfSislabra/GetPdfSislabra/GetPdfForPicaPau';
/* import { verificarArraySislabra } from '../GetInformationSislabra/GetInformationEmprego/EmpregoSislabra';
import { impeditivoVeiculo } from '../GetInformationSislabra/GetInformationVeiculo/VeículoSislabra';
import { enderecosEncontrados } from '../GetInformationSislabra/GetInformationEndereco/enderecoEncontrado';
import { doacoesEleitorais } from '../GetInformationSislabra/GetInformationDoacoesEleitorais/DoacoesEleitoraisSislabra';
import { imoveisSp } from '../GetInformationSislabra/GetInformationImoveis/imoveisSaopaulo'; */
import { getInformationSislabraForPicaPau } from '../GetInformationSislabra';
export class GetInformationFromSapienForSamirUseCaseSemIdade {

    async execute(data: IGetInformationsFromSapiensDTO): Promise<any> {
        // console.log("teste")
        // const teste = await getUsuarioUseCase.execute("PHPSESSID:f29006e787410cd44bc088093391ba7b")
        // console.log(teste)
        const cookie = await loginUseCase.execute(data.login);
        const usuario = (await getUsuarioUseCase.execute(cookie));

        const usuario_id = `${usuario[0].id}`;

        let response: Array<IInformationsForCalculeDTO> = [];
        let responseForPicaPau: Array<String> = [];
        let tarefaId: any = "";

        
        
            let tarefas = await getTarefaUseCase.execute({ cookie, usuario_id, etiqueta: data.etiqueta });
            let VerificarSeAindExisteProcesso: boolean = true;
            while(VerificarSeAindExisteProcesso){

                for (var i = 0; i <= tarefas.length - 1; i++) {
                    console.log("Qantidade faltando triar", (tarefas.length - i));
                    
                    try{

                    
                    
                    tarefaId = tarefas[i].id; 
                    const objectGetArvoreDocumento: IGetArvoreDocumentoDTO = { nup: tarefas[i].pasta.NUP, chave: tarefas[i].pasta.chaveAcesso, cookie, tarefa_id: tarefas[i].id }
                    let arrayDeDocumentos: ResponseArvoreDeDocumento[];
    
                    try {
                        arrayDeDocumentos = (await getArvoreDocumentoUseCase.execute(objectGetArvoreDocumento)).reverse();
                    } catch (error) {
                        console.log(error);
                        (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV COM FALHA NA PESQUISA", tarefaId }));
                        continue
                    }
    
    
    
                    const arrayDosIDParaBuscarpdf: Array<number> = [];
                    const arrayIdSislabra:Array<any> = [];
                    const paginaCapaFormatada = new JSDOM(await getCapaDoPassivaUseCase.execute(tarefas[i].pasta.NUP, cookie))
    
                    /* const arraySislabraAutor: Array<number> = []; */
                    let objectDosPrev: any = "";
                    var procurarDossies = arrayDeDocumentos.filter(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "DOSPREV");
                    //console.log(objectDosPrev2[0].documentoJuntado.componentesDigitais[0].id)
    
    
    
    
    
    
                    var objectDosPrevNaoExisti = procurarDossies[0] == null;
                    if (objectDosPrevNaoExisti) {
                        arrayDeDocumentos = await coletarArvoreDeDocumentoDoPassivo(objectGetArvoreDocumento)
                        procurarDossies[0] = arrayDeDocumentos.find(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "DOSPREV");
                        objectDosPrevNaoExisti =procurarDossies[0] == null;
                        if (objectDosPrevNaoExisti) {
                            console.log("DOSPREV NÃO ECONTRADO");
                            (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV NÃO ECONTRADO", tarefaId }))
                            continue;
                        }
                    }
    
    
    
    
                    const dosPrevSemIdParaPesquisa = (procurarDossies[0].documentoJuntado.componentesDigitais.length) <= 0;
                    if (dosPrevSemIdParaPesquisa) {
                        console.log("DOSPREV COM FALHA NA PESQUISA");
                        (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV COM FALHA NA PESQUISA", tarefaId }))
                        continue;
                    }
                    let idDosprevParaPesquisaId: any = procurarDossies[0].documentoJuntado.componentesDigitais[0].id;
                    let parginaDosPrevParaId = await getDocumentoUseCase.execute({ cookie, idDocument: idDosprevParaPesquisaId });
    
                    let parginaDosPrevFormatadaParaId = new JSDOM(parginaDosPrevParaId);
    
    
    
    
                    let idDosprevParaPesquisa: any = "";
                    let parginaDosPrev: any = "";
                    let parginaDosPrevFormatada:any = "";
    
                    //Buscar o Cpf na capa
                    let idProcurarPoloAtivo: number = 1; 
                    let whileVerificar = true;
                    let CpfAutor = "";
                    while(whileVerificar){
                        const tabelasProcurarAtivo = getXPathText(paginaCapaFormatada, `html/body/div/div[6]/table/tbody/tr[${idProcurarPoloAtivo}]`)
                        const regex = /\s{3}/;
                        const tabelasProcurarAtivoSemEspaco = tabelasProcurarAtivo.replace(regex, ",");
                        //console.log(tabelasProcurarAtivoSemEspaco);
                        if( tabelasProcurarAtivoSemEspaco.indexOf("REQUERENTE (PÓLO ATIVO)") != -1){
                            //console.log(tabelasProcurarAtivoSemEspaco)
                            whileVerificar = false;
                            const indiceAbertura = tabelasProcurarAtivoSemEspaco.indexOf("("); // encontra o índice da primeira ocorrência do parêntese aberto
                            const indiceFechamento = tabelasProcurarAtivoSemEspaco.indexOf(")"); // encontra o índice da primeira ocorrência do parêntese fechado
                            if (indiceAbertura !== -1 && indiceFechamento !== -1 && indiceAbertura < indiceFechamento) {
                                const conteudoEntreParenteses = tabelasProcurarAtivoSemEspaco.substring(indiceAbertura + 1, indiceFechamento); // extrai o conteúdo entre os parênteses
                                const numerosSemPontos = conteudoEntreParenteses.replace(/\.|-/g, "");
                                /* console.log(numerosSemPontos)
                                console.log("PASSOU AQUI 1 VEZES") */
                                CpfAutor = numerosSemPontos;
                                
                              }
                        }
                        idProcurarPoloAtivo++;
                    }
                    //
    
                    let IdDosErroCatch: any = ""
                    const xpatgCpfAutor = '/html/body/div/div[1]/table/tbody/tr[7]/td';
                    const verificarCpfParaEntrarNoIf = getXPathText(parginaDosPrevFormatadaParaId, xpatgCpfAutor)
                    let VerificarEtapaDoisDossie: boolean = false;
    
                    if(verificarCpfParaEntrarNoIf != CpfAutor){
                        //console.log('entrou')
                        try{
                        
                            for(let j=0; j<procurarDossies.length; j++){
                                IdDosErroCatch = procurarDossies[j];
                                let idDos = procurarDossies[j].documentoJuntado.componentesDigitais[0].id;
                                let novoObjetoDos =  procurarDossies[j];
                                let parginaDosPrevParaverificar = await getDocumentoUseCase.execute({ cookie, idDocument: idDos });
                                let parginaDosPrevFormatadaVerificar = new JSDOM(parginaDosPrevParaverificar);
                                let verificarCpf = getXPathText(parginaDosPrevFormatadaVerificar, xpatgCpfAutor)
                                if(verificarCpf == CpfAutor){
                                    console.log("Entrou")
                                    objectDosPrev = novoObjetoDos;
                                    idDosprevParaPesquisa = objectDosPrev.documentoJuntado.componentesDigitais[0].id;
                                    parginaDosPrev = await getDocumentoUseCase.execute({ cookie, idDocument: idDosprevParaPesquisa });
                                    parginaDosPrevFormatada = new JSDOM(parginaDosPrev);                                      
                                    break;
                                }
                                
                            }

                            //Irá cair nesse if, caso tenha dossie no documento, porem nenhum dossie é do autor;
                            if(VerificarEtapaDoisDossie == false){
                                (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV NÃO ECONTRADO", tarefaId }))
                                continue;
                            }
                            
                        }catch{
                                var objectDosPrevNaoExisti = IdDosErroCatch == null;
                            if (objectDosPrevNaoExisti) {
                                arrayDeDocumentos = await coletarArvoreDeDocumentoDoPassivo(objectGetArvoreDocumento)
                                IdDosErroCatch = arrayDeDocumentos.find(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "DOSPREV");
                                objectDosPrevNaoExisti =IdDosErroCatch == null;
                                if (objectDosPrevNaoExisti) {
                                    console.log("DOSPREV NÃO ECONTRADO");
                                    (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV NÃO ECONTRADO", tarefaId }))
                                    continue;
                                }
                            }
        
        
        
        
                            const dosPrevSemIdParaPesquisa = (IdDosErroCatch.documentoJuntado.componentesDigitais.length) <= 0;
                            if (dosPrevSemIdParaPesquisa) {
                                console.log("DOSPREV COM FALHA NA PESQUISA");
                                (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV COM FALHA NA PESQUISA", tarefaId }))
                                continue;
                            }
    
                            objectDosPrev = IdDosErroCatch;
                            idDosprevParaPesquisa = objectDosPrev.documentoJuntado.componentesDigitais[0].id;
                            parginaDosPrev = await getDocumentoUseCase.execute({ cookie, idDocument: idDosprevParaPesquisa });
    
                            parginaDosPrevFormatada = new JSDOM(parginaDosPrev);
                        }
                    }else{
                        //console.log('entrou')
                         objectDosPrev = procurarDossies[0];
                         idDosprevParaPesquisa = objectDosPrev.documentoJuntado.componentesDigitais[0].id;
                         parginaDosPrev = await getDocumentoUseCase.execute({ cookie, idDocument: idDosprevParaPesquisa });
    
                         parginaDosPrevFormatada = new JSDOM(parginaDosPrev);
                    }
        
                    //console.log(objectDosPrev.documentoJuntado.componentesDigitais[0].id)
                    
                    
                    
                    var objDosis: any = arrayDeDocumentos.filter(Documento => Documento.movimento == "JUNTADA DE DOCUMENTO - ANEXADO" && Documento.documentoJuntado.tipoDocumento.sigla == "PESBEN");
                    var objDosis2: any = arrayDeDocumentos.filter(Documento => Documento.movimento == "JUNTADA DE DOCUMENTO" && Documento.documentoJuntado.tipoDocumento.sigla == "PESBEN");
                    var objDosis3: any = arrayDeDocumentos.filter(Documento => Documento.movimento == "JUNTADA DE DOCUMENTO - SISLABRA - AUTOR");
                    var objDosis4: any = arrayDeDocumentos.filter(Documento => Documento.movimento == "JUNTADA DE DOCUMENTO - SISLABRA - POSSÍVEL CÔNJUGE OU COMPANHEIRO");
                    var objDosis5: any = arrayDeDocumentos.filter(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "SITCADCPF");
                    
                    if(objDosis[0] != undefined){
                        arrayIdSislabra.push(objDosis[0]);
                    }
                    if(objDosis2[0] != undefined){
                        arrayIdSislabra.push(objDosis2[0])
                    }
                    if(objDosis3[0] != undefined){
                        arrayIdSislabra.push(objDosis3[0])
                    }
                    if(objDosis4[0] != undefined){
                        arrayIdSislabra.push(objDosis4[0])
                    }
                    if(objDosis5[0] != undefined){
                        arrayIdSislabra.push(objDosis5[0])
                    }
                    /* const idParaBuscarIdSislabra1: number = objDosis[0].documentoJuntado.componentesDigitais[0].id;
                    const idParaBuscarIdSislabra2: number = objDosis[1].documentoJuntado.componentesDigitais[0].id; */
                    
    
                    /* arrayIdSislabra.push(...objDosis, ...objDosis2, ...objDosis3); */
    
                    if(arrayIdSislabra.length <= 0){
                        (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "SISLABRA NÃO ENCONTRADO", tarefaId }))
                            continue;
                    }
                    /* console.log(arrayIdSislabra)
                    console.log("Juntada documento - anexADO:" + objDosis)
                    console.log("JUNTADA DE DOCUMENTO - SISLABRA - AUTOR" + objDosis2)
                    console.log(arrayIdSislabra.length) */
                    
                    if(arrayIdSislabra.length>2){
                        (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "FALHA AO EXAMINAR SISLABRA", tarefaId }))
                            continue;
                    }
    
                    if(arrayIdSislabra.length==1){
                         const idParaBuscarIdSislabra1 = arrayIdSislabra[0].documentoJuntado.componentesDigitais[0].id;
                         arrayDosIDParaBuscarpdf.push(idParaBuscarIdSislabra1);
                    }else{
                         const idParaBuscarIdSislabra1= arrayIdSislabra[0].documentoJuntado.componentesDigitais[0].id;
                         const idParaBuscarIdSislabra2 = arrayIdSislabra[1].documentoJuntado.componentesDigitais[0].id;
                         arrayDosIDParaBuscarpdf.push(idParaBuscarIdSislabra1, idParaBuscarIdSislabra2);
                    }
                    //console.log(arrayDosIDParaBuscarpdf);
                    
                    
    
    
    
                
                 
                    
                    
                    
                    
                    
                   
                   
                    
                    
                    
    
    
                    
                   
                        let impedCapa: Array<String> = await impedimentosCapa.Impedimentos(await getCapaDoPassivaUseCase.execute(tarefas[i].pasta.NUP, cookie));
                        responseForPicaPau.push(...impedCapa);
                       
    
                        let impedDossie: Array<string> = await getInformationDossieForPicaPauSemIdade.impedimentos(parginaDosPrevFormatada, parginaDosPrev);
                        responseForPicaPau.push(...impedDossie) 
    
                        let impedSislabra: Array<string> = await getInformationSislabraForPicaPau.impedimentos(arrayDosIDParaBuscarpdf, cookie, CpfAutor)
                        responseForPicaPau.push(...impedSislabra)
                    
    
                        /* let impedCapa: Array<String> = await impedimentosCapa.Impedimentos(await getCapaDoPassivaUseCase.execute(tarefas[i].pasta.NUP, cookie));
                        responseForPicaPau.push(...impedCapa);
                        
    
                        let impedDossie: Array<string> = await getInformationDossieForPicaPau.impedimentos(parginaDosPrevFormatada, parginaDosPrev);
                        responseForPicaPau.push(...impedDossie)
    
    
    /*                 var beneficios = await getInformaçoesIniciasDosBeneficios(parginaDosPrevFormatada)
                    if (beneficios.length <= 0) {
                        console.log("DOSPREV SEM BENEFICIO VALIDOS");
                        (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV SEM BENEFICIO VALIDOS", tarefaId }))
                        continue
                    }
                    beneficios = await getInformaçoesSecudariaDosBeneficios(beneficios, parginaDosPrevFormatada)
    
                    const xpathNumeroDoProcesso = "/html/body/div/div/table/tbody/tr/td"
                    const numeroDoProcesso: string = getXPathText(parginaDosPrevFormatada, xpathNumeroDoProcesso);
    
                    const xpathdataAjuizamento = "/html/body/div/div[1]/table/tbody/tr[2]/td"
                    const dataAjuizamento: string = getXPathText(parginaDosPrevFormatada, xpathdataAjuizamento);
    
                    const xpathNome = "/html/body/div/div[1]/table/tbody/tr[6]/td[1]"
                    const nome: string = getXPathText(parginaDosPrevFormatada, xpathNome);
    
                    const xpathCpf = "/html/body/div/div[1]/table/tbody/tr[7]/td"
                    const cpf: string = getXPathText(parginaDosPrevFormatada, xpathCpf);
    
                    const urlProcesso = `https://sapiens.agu.gov.br/visualizador?nup=${tarefas[i].pasta.NUP}&chave=${tarefas[i].pasta.chaveAcesso}&tarefaId=${tarefas[i].id}`
                    // console.log("urlProcesso", urlProcesso, "cpf", cpf, "nome", nome, "dataAjuizamento", dataAjuizamento, "numeroDoProcesso", numeroDoProcesso);
                    const citacao = coletarCitacao(arrayDeDocumentos)
                    let informationsForCalculeDTO: IInformationsForCalculeDTO = await fazerInformationsForCalculeDTO(beneficios, numeroDoProcesso, dataAjuizamento, nome, cpf, urlProcesso, citacao, parseInt(tarefaId))
                    // { beneficio: "teste", dibAnterior: "teste", beneficioAcumuladoBoolean: false, dibInicial: "teste", dip: "teste", id: parseInt(tarefaId), nb: "teste", rmi: "teste", tipo: "teste", numeroDoProcesso, dataAjuizamento, nome, cpf, urlProcesso, citacao },
                    console.log(informationsForCalculeDTO);
                    response.push(informationsForCalculeDTO);
                    // Ativar quando entrar em produção
                    await updateEtiquetaUseCase.execute({ cookie, etiqueta: "TESTE API", tarefaId }) */
                    
    
    //console.log(response2)
                    
                    if(responseForPicaPau.length==0){
                        await updateEtiquetaUseCase.execute({cookie, etiqueta: "PROCESSO LIMPO", tarefaId});
                    }else{
                        let etiquetaFinal = "";
                        for(let j = 0; j<responseForPicaPau.length; j++){
                            etiquetaFinal += responseForPicaPau[j] + " ,\n";
    
                        }
    
                            let lastCommaIndex = etiquetaFinal.lastIndexOf(',');   
                            etiquetaFinal = etiquetaFinal.slice(0, lastCommaIndex);
                        
                        const Imp = "IMPEDITIVOS: "
                        await updateEtiquetaUseCase.execute({cookie, etiqueta: `${Imp}${etiquetaFinal.slice(0,etiquetaFinal.length - 1)}`, tarefaId});
                        //console.log(etiquetaFinal)
    
                    }
    
    
                    responseForPicaPau = [];
                } catch (error) {
                    console.log(error);
                    (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "ERRO AO TRIAR ESSE DOCUMENTO", tarefaId }));
                    continue;
                }

                }
                tarefas = await getTarefaUseCase.execute({ cookie, usuario_id, etiqueta: data.etiqueta });
                if(tarefas.length==0){
                    VerificarSeAindExisteProcesso = false;
                }      

            }
            
            return await response
        
    }

}

