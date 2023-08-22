import { downloadPDFWithCookies } from "../GetPdfSislabra/GetPdfSislabra/GetPdfForPicaPau";
import { readPDF } from "../GetPdfSislabra/ReadPdf";
import { deletePDF } from "../GetPdfSislabra/GetPdfSislabra/GetPdfForPicaPau";
import { doacoesEleitorais } from "./GetInformationDoacoesEleitorais";
import { empresa } from "./GetInformationEmpresa";
import { veiculo } from "./GetInformationVeiculo";
import { endereco } from "./GetInformationEndereco";
import { imoveis } from "./GetInformationImoveis";
import { doacoesTse } from "./GetInformationBensTse";
import { imoveisRurais } from "./GetInformationImoveisRurais";
import { embarcacoes } from "./GetInformationEmbarcacoes";
import { aeronaves } from "./GetInformationAeronave";
import { emprego } from "./GetInformationEmprego";
import { criarHtml } from "../GetPdfSislabra/GetPdfSislabra/CreateHtml";
import { excluirArquivosComPrefixo } from "../GetPdfSislabra/GetPdfSislabra/DeleteHtml";
import { error } from "console";
import { lePdf } from "../GetPdfSislabra/GetPdfSislabra/HeadPdf";


export class GetInformationSislabraForPicaPau{
    async impedimentos(arrayDosIDParaBuscarpdf: Array<any>, cookie: any, cpfAutor: string): Promise<Array<string>>{
        console.log("ENTROU NO FOR DO SISLABRA")
                var responseForPicaPau : Array<string> = [];
                var VerificarAutorMaisDeUmaAutorEmpresa: number = 0;
                var VerificarAutorMaisDeUmaConjugeEmpresa: number = 0;
                var VerificarAutorMaisDeUmaAutorVeiculo: number = 0;
                var VerificarAutorMaisDeUmaConjugeVeiculo: number = 0;
                var VerificarAutorMaisDeUmaAutorEndereco: number = 0;
                var VerificarAutorMaisDeUmaConjugeEndereco: number = 0;
                var VerificarAutorMaisDeUmaAutorDoacoes: number = 0;
                var VerificarAutorMaisDeUmaConjugeDoacoes : number = 0;
                var VerificarAutorMaisDeUmaAutorImoveis: number = 0;
                var VerificarAutorMaisDeUmaConjugeImoveis : number = 0;
                var VerificarAutorMaisDeUmaAutorDoacoesTse: number = 0;
                var VerificarAutorMaisDeUmaConjugerDoacoesTse: number = 0;
                var VerificarAutorMaisDeUmaAutorImoveisRurais: number = 0;
                var VerificarAutorMaisDeUmaConjugeImoveisRurais: number = 0;
                var VerificarAutorMaisDeUmaAutorEmbarcacoes: number = 0;
                var VerificarAutorMaisDeUmaConjugeEmbarcacoes: number = 0;
                var VerificarAutorMaisDeUmaAutorAeronaves: number = 0;
                var VerificarAutorMaisDeUmaConjugeAeronaves: number = 0;
                var VerificarAutorMaisDeUmaAutorEmpregos: number = 0;
                var VerificarAutorMaisDeUmaConjugeEmpregos: number = 0;
            console.log(arrayDosIDParaBuscarpdf);
                    for(let i=0; i<arrayDosIDParaBuscarpdf.length; i++){
                        //console.log(`https://sapiens.agu.gov.br/documento/${arrayDosIDParaBuscarpdf[i]}`)
                        console.log("entrou aqui n vezes")
                        await downloadPDFWithCookies(`https://sapiens.agu.gov.br/documento/${arrayDosIDParaBuscarpdf[i]}`,cookie)
                        .then(() => console.log('PDF downloaded successfully!'))
                        .catch((error) => console.error('Error downloading PDF:', error));
                        try{
                            console.log("aqui")
                        const pdf = await readPDF('build/modules/GetPdfSislabra/GetPdfSislabra/sislabra.pdf')
                        await criarHtml();
                        //console.log(pdf);
                        //Ative quando for para produção
                        /* const pdf = await readPDF('resources/app/build/modules/GetPdfSislabra/GetPdfSislabra/sislabra.pdf') */
                        /* await criarHtml().then(() => console.log("ok")).catch((error) => console.log(error)); */

                        
                            
                            //VERIFICAÇÃO IMPEDITIVO EMPRESA
                            const impedEmpresa: Array<boolean> = await empresa.hundle(pdf, cpfAutor);
                            if(impedEmpresa.length >= 2 && VerificarAutorMaisDeUmaAutorEmpresa < 1){
                                VerificarAutorMaisDeUmaAutorEmpresa++;
                                responseForPicaPau.push("Empresa autor")
                            }else if(impedEmpresa[0] == true && VerificarAutorMaisDeUmaConjugeEmpresa < 1 && impedEmpresa.length < 2){
                                VerificarAutorMaisDeUmaConjugeEmpresa++;
                                responseForPicaPau.push("Empresa cônjuge")
                            }else{
                                console.log("Não tem impeditivo empresa")
                            }

                            console.log("segunda parte")
                            //VERIFICAÇÃO IMPEDITIVO VEÍCULO
                            const impeditivoVeiculoBolean: Array<any> = await veiculo.hundle(pdf, cpfAutor);
                            console.log("AQUI NO FOR " +impeditivoVeiculoBolean)
                            if(impeditivoVeiculoBolean.length > 1 && VerificarAutorMaisDeUmaAutorVeiculo < 1){
                                console.log("VEICULO AUTOR")
                                console.log(impeditivoVeiculoBolean.length)
                                VerificarAutorMaisDeUmaAutorVeiculo++
                                responseForPicaPau.push("VEICULO AUTOR")
                            }else if(impeditivoVeiculoBolean.length == 1 && impeditivoVeiculoBolean[0] == true && VerificarAutorMaisDeUmaConjugeVeiculo < 1){
                                console.log("VEICULO cônjuge")
                                VerificarAutorMaisDeUmaConjugeVeiculo++;
                                responseForPicaPau.push("VEICULO cônjuge")
                            }

                            

                            //VERIFICAÇÃO IMPEDITIVO ENDERECO
                            /* const enderecosBolean:Array<boolean> = await endereco.handle(pdf, cpfAutor);
                            if(enderecosBolean.length > 1 && VerificarAutorMaisDeUmaAutorEndereco < 1){
                                VerificarAutorMaisDeUmaAutorEndereco++;
                                responseForPicaPau.push(" Cidade Autor")
                            }else if(enderecosBolean.length == 1 && VerificarAutorMaisDeUmaConjugeEndereco < 1){
                                VerificarAutorMaisDeUmaConjugeEndereco++;
                                responseForPicaPau.push("cidade Cônjuge")
                            }
 */
                            

                            //VERIFICAR DOAÇOES ELEITORAIS
                            const doacoesSislabra: Array<boolean> = await doacoesEleitorais.hundle(pdf, cpfAutor);
                            if(doacoesSislabra.length > 1 && VerificarAutorMaisDeUmaAutorDoacoes < 1){
                                VerificarAutorMaisDeUmaAutorDoacoes++
                                responseForPicaPau.push(" Doações Eleitorais Autor")
                            }else if(doacoesSislabra.length == 1 && VerificarAutorMaisDeUmaConjugeDoacoes < 1){
                                VerificarAutorMaisDeUmaConjugeDoacoes++
                                responseForPicaPau.push(" Doações Eleitorais Cônjuge")
                            }
                            
                            

                            //VERIFICAR IMOVEIS EM SP
                            const imoveisSP = await imoveis.handle(pdf, cpfAutor); 
                            if(imoveisSP.length > 1 && VerificarAutorMaisDeUmaAutorImoveis < 1){
                                VerificarAutorMaisDeUmaAutorImoveis++
                                responseForPicaPau.push("Imoveis SP Autor")
                            }else if(imoveisSP.length == 1 && VerificarAutorMaisDeUmaConjugeImoveis < 1){
                                VerificarAutorMaisDeUmaConjugeImoveis++
                                responseForPicaPau.push(" Imoveis SP Cônjuge")
                            }


                            console.log("quinta parte")
                            //VERIFICAR DOACOES TSE
                            const doacoesTSE = await doacoesTse.handle(pdf, cpfAutor);
                            if(doacoesTSE.length > 1 && VerificarAutorMaisDeUmaAutorDoacoesTse < 1){
                                VerificarAutorMaisDeUmaAutorDoacoesTse++;
                                responseForPicaPau.push("Bens Declarados ao TSE Autor")
                            }else if(doacoesTSE.length==1 && VerificarAutorMaisDeUmaConjugerDoacoesTse < 1){
                                VerificarAutorMaisDeUmaConjugerDoacoesTse++;
                                responseForPicaPau.push("Bens Declarados ao TSE Cônjuge")
                            }




                            console.log("secxta parte")
                            //Imoveis Rurais
                            const IImoveisRurais = await imoveisRurais.handle(pdf, cpfAutor); 
                            if(IImoveisRurais.length > 1 && VerificarAutorMaisDeUmaAutorImoveisRurais < 1){
                                VerificarAutorMaisDeUmaAutorImoveisRurais++;
                                responseForPicaPau.push("Imoveis Rurais Autor")
                            }else if(IImoveisRurais.length == 1 && VerificarAutorMaisDeUmaConjugeImoveisRurais < 1){
                                VerificarAutorMaisDeUmaConjugeImoveisRurais++;
                                responseForPicaPau.push("Imoveis Rurais Cônjuge")
                            }




                            console.log("setima parte")
                            const IEmbarcacoes = await embarcacoes.handle(pdf, cpfAutor);
                            if(IEmbarcacoes.length > 1 && VerificarAutorMaisDeUmaAutorEmbarcacoes < 1){
                                VerificarAutorMaisDeUmaAutorEmbarcacoes++;
                                responseForPicaPau.push("Embarcações Autor")
                            }else if(IEmbarcacoes.length == 1 && VerificarAutorMaisDeUmaConjugeEmbarcacoes < 1){
                                VerificarAutorMaisDeUmaConjugeEmbarcacoes++;
                                responseForPicaPau.push("Embarcações Cônjuge")
                            }


                            console.log("oitava parte")
                            const IAeronaves = await aeronaves.handle(pdf, cpfAutor);
                            if(IAeronaves.length > 1 && VerificarAutorMaisDeUmaAutorAeronaves < 1){
                                VerificarAutorMaisDeUmaAutorAeronaves++;
                                responseForPicaPau.push("Aeronaves Autor")
                            }else if(IAeronaves.length == 1 && VerificarAutorMaisDeUmaConjugeAeronaves < 1){
                                VerificarAutorMaisDeUmaConjugeAeronaves++;
                                responseForPicaPau.push("Aeronaves Cônjuge")
                            }




                            console.log("nona parte")
                            console.log("Com o Split:  " + await emprego.handle(pdf, cpfAutor) + "@@");
                            const EEmpregos = await emprego.handle(pdf, cpfAutor);
                            console.log("ddddddddddddddddddddd" + EEmpregos)
                            if(EEmpregos.length > 1 && VerificarAutorMaisDeUmaAutorEmpregos < 1){
                                VerificarAutorMaisDeUmaAutorEmpregos++;
                                responseForPicaPau.push("Emprego sislabra Autor")
                            }else if(EEmpregos.length == 1 && VerificarAutorMaisDeUmaConjugeEmpregos < 1){
                                VerificarAutorMaisDeUmaConjugeEmpregos++;
                                responseForPicaPau.push("Emprego sislabra Cônjuge")
                            }

                            

                            




                        await excluirArquivosComPrefixo();
                        deletePDF('sislabra.pdf');
                        
                        }catch{ 
                            responseForPicaPau.length == 0;
                            responseForPicaPau.push("ERRO AO EXAMINAR SISLABRA")
                            return responseForPicaPau;
                        }
                        
                    }
                    return responseForPicaPau;
    }
}