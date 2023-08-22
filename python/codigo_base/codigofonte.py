import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta


class Access_sapiens:

    def __init__(self, cpf, senha):

        self.uss = str(cpf)
        self.pass_sapiens = str(senha)
        self.url_sapiens = 'https://sapiens.agu.gov.br/'
        self.login_extension = 'login'
        self.login_check_extension = 'login_check'
        self.sessao = requests.session()
        self.token = self.get_inicial_page_token()
        self.cookies_values_login_page_list = self.sessao.cookies.values()
        self.cookies_internal_page_list = self.get_login_cookies()
        self.cookies_values_internal_page_list = self.cookies_internal_page_list.values()
        self.cookies_keys_internal_page_list = self.cookies_internal_page_list.keys()
        self.cookie_timeout = self.get_cookie_expiration()
        self.sucesso_login = self.cookie_comparison()
        self.cookie = self.dict_cookies()
        self.tid = 0

    def get_inicial_page_token(self):
        get_sapiens_external_page = self.sessao.get(self.url_sapiens + self.login_extension)
        html_page_login = get_sapiens_external_page.content
        soup = BeautifulSoup(html_page_login,'html.parser')
        token = soup.find('input')['value']
        return token

    def get_login_cookies(self):
        dict_post = {"_csrf_token": str(self.token),"_username": self.uss,"_password": self.pass_sapiens,"_submit": "Login"}
        self.sessao.post(self.url_sapiens + self.login_check_extension,data=dict_post)
        cookies_logado  = self.sessao.cookies
        print(self.sessao.cookies)
        print(cookies_logado)
        # print(str(self.sessao.status_code))
        return cookies_logado

    def get_cookie_expiration(self):
        procedure_start = datetime.now()
        timeout = timedelta(0,5400)
        procedure_end = procedure_start + timeout
        return procedure_end

    def cookie_comparison(self):
        if self.cookies_values_internal_page_list == self.cookies_values_login_page_list:
            sucesso_login = False
        else:
            sucesso_login = True
        return sucesso_login

    def dict_cookies(self):
        if self.sucesso_login:
            if len(self.cookies_values_internal_page_list) > 1:
                cookie_name_1 = self.cookies_keys_internal_page_list[0]
                cookie_name_2 = self.cookies_keys_internal_page_list[1]
                cookie_value_1 = self.cookies_values_internal_page_list[0]
                cookie_value_2 = self.cookies_values_internal_page_list[1]
                dict_cookie = f'{str(cookie_name_1)}={str(cookie_value_1)}; {str(cookie_name_2)}={str(cookie_value_2)}'
                # print(f'dict_cookie é {str(dict_cookie)}')
                return True, dict_cookie
            else:
                return False, 'Houve um problema na tentativa de captar o cookie de acesso. Tente novamente!'
        else:
            return False, 'Acesso negado, verifique se o CPF e a senha estão corretos!'


    def get_tid(self):
        self.tid = self.tid + 1
        return str(self.tid)


class Requests_payloads_sapiens:

    def __init__(self,tid,IDIntimacao="",IDPasta=None,IDPastaVinculada=None,centenaDistribuicao=None,data_atual=None,
                 digitoDistribuicao=None,distribuicaoAutomatica=None,entidade_id=None,entidade_nome=None,
                 especie_atividade_id=None,especie_tarefa_id="",etiqueta="",fimPrazo=None,fonteDados=None,
                 fonteDados_id=None,idConsultante=None,idFormatado=None,id_doc_minuta_list=None,inicioPrazo=None,
                 modalidadeComunicacaoJudicial_id=None,modelo_id=None,numProcesso=None,observacao=None,
                 poloEntidade=None,processo_id=None,repercussao_id=None,setorDestino_id=None,setorDistribuidor_id=None,
                 setor_nome=None,tarefa_id=None,teor=None,tipoDocumento_id=None,unidade_id=None,usuarioDestino_id="",
                 usuario_id=None,usuario_nome=None):


        self.centenaDistribuicao = centenaDistribuicao
        self.data_atual = data_atual
        self.digitoDistribuicao = digitoDistribuicao
        self.distribuicaoAutomatica = distribuicaoAutomatica
        self.entidade_id = entidade_id
        self.entidade_nome = entidade_nome
        self.especie_atividade_id = especie_atividade_id
        self.especie_tarefa_id = especie_tarefa_id
        self.etiqueta = etiqueta
        self.fimPrazo = fimPrazo
        self.fonteDados = fonteDados
        self.fonteDados_id = fonteDados_id
        self.id_doc_minuta_list = id_doc_minuta_list
        self.idConsultante = idConsultante
        self.idFormatado = idFormatado
        self.IDIntimacao = IDIntimacao
        self.IDPasta = IDPasta
        self.IDPastaVinculada = IDPastaVinculada
        self.inicioPrazo = inicioPrazo
        self.modalidadeComunicacaoJudicial_id = modalidadeComunicacaoJudicial_id
        self.modelo_id = modelo_id
        self.numProcesso = numProcesso
        self.observacao = observacao
        self.poloEntidade = poloEntidade
        self.processo_id = processo_id
        self.repercussao_id = repercussao_id
        self.setorDestino_id = setorDestino_id
        self.setorDistribuidor = setorDistribuidor_id
        self.setor_nome = setor_nome
        self.tarefa_id = tarefa_id
        self.teor = teor
        self.tid = tid
        self.tipoDocumento_id = tipoDocumento_id
        self.unidade_id = unidade_id
        self.usuario_id = usuario_id
        self.usuario_nome = usuario_nome
        self.usuarioDestino = usuarioDestino_id

    def dict_createAtividade(self):

        dict_payload = {"action": "SapiensAdministrativo_Atividade",
            "method": "createAtividade",
            "data": [{"dataHoraConclusao": self.data_atual,
                "criadoPor_id": "",
                "atualizadoPor_id": "",
                "criadoEm": None,
                "apagadoEm": None,
                "atualizadoEm": None,
                "observacao": self.observacao,
                "encerraTarefa": True,
                "tramitar": False,
                "peticionamentoEletronico": False,
                "especieAtividade_id": self.especie_atividade_id,
                "reducaoLitigio_id": "",
                "complementoReducaoLitigio": "",
                "assuntoConsultivo_id": None,
                "setor_id": self.setorDistribuidor,
                "setorSubmeter_id": "",
                "usuario_id": self.usuario_id,
                "usuarioSubmeter_id": "",
                "tarefa_id": self.tarefa_id,
                "documento_id": "",
                "minutas_id": self.id_doc_minuta_list,
                "destinoMinuta": "juntar",
                "ciencia": "",
                "renuncia": "",
                "peticionamento": False,
                "informacaoComplementar1": "",
                "informacaoComplementar2": "",
                "informacaoComplementar3": "",
                "informacaoComplementar4": "",
                "informacaoComplementar5": None,
                "informacaoComplementar6": None,
                "informacaoComplementar7": "",
                "valor1": 0,
                "valor2": 0,
                "valor3": 0,
                "valor4": 0,
                "dataValor1": None,
                "dataValor2": None,
                "dataValor3": None}],
            "type": "rpc",
            "tid": int(self.tid)}

        return dict_payload

    def dict_createComunicacaoJudicial(self):

        dict_payload = {"action": "SapiensJudicial_ComunicacaoJudicial",
            "method": "createComunicacaoJudicial",
            "data": [{"movimentoNacional_id": "",
                "numero": self.numProcesso,
                "numeroAlternativo": "",
                "fonteDados_id": self.fonteDados_id,
                "fonteDados": self.fonteDados,
                "postIt": self.etiqueta,
                "modalidadeRepercussao_id": self.repercussao_id,
                "pasta_id": "",
                "idComunicacao": "",
                "teor": self.teor,
                "nivelSigilo": "",
                "dataHoraInicioPrazo": self.inicioPrazo,
                "dataHoraFinalPrazo": self.fimPrazo,
                "pessoa_id": None,
                "modalidadeComunicacaoJudicial_id": self.modalidadeComunicacaoJudicial_id,
                "tarefa_id": "",
                "setor_id": self.setorDestino_id,
                "unidade_id": self.unidade_id,
                "processoJudicial_id": "",
                "status": 0,
                "statusIntegracao": 0,
                "numeros": "",
                "criadoPor_id": "",
                "atualizadoPor_id": "",
                "criadoEm": None,
                "apagadoEm": None,
                "atualizadoEm": None,
                "centenaDistribuicao": 0,
                "digitoDistribuicao": 0,
                "poloEntidade": "",
                "especieSetor_id": "",
                "criaAvocacao": False,
                "integracao": False,
                "idConsultante": "",
                "idFormatado": "id:  - undefined -  - prazo final em "}],
            "type": "rpc",
            "tid": int(self.tid)}

        return dict_payload

    def dict_createDocumento(self):

        dict_payload = {"action": "SapiensAdministrativo_Documento",
                "method": "createDocumento",
                "data": [{"numeroFolhas":0,
                          "dataHoraProducao":None,
                          "localProducao":"",
                          "vinculado": False,
                          "copia": False,
                          "observacao": "",
                          "autor": self.usuario_nome,
                          "pasta_id": self.IDPasta,
                          "redator": self.usuario_nome,
                          "procedencia_id": "",
                          "tipoDocumento_id": self.tipoDocumento_id,
                          "modelo_id": self.modelo_id,
                          "comunicacaoRemessa_id": "",
                          "setorOrigem_id": self.setorDistribuidor,
                          "tarefaOrigem_id": self.tarefa_id,
                          "visibilidadeRestrita": False,
                          "semEfeito": False,
                          "localizadorOriginal": "",
                          "minuta": False,
                          "outroNumero":"",
                          "criadoPor_id":"",
                          "origemDados_id":"",
                          "atualizadoPor_id":"",
                          "anexaCopia":"",
                          "descricaoOutros":"",
                          "anexaCopiaVinculados":False,
                          "parentId": None,
                          "leaf":False}],
                "type": "rpc",
                "tid": int(self.tid)}

        return dict_payload

    def dict_createProcessoJudicial(self):

        dict_payload = {"action": "SapiensJudicial_ProcessoJudicial",
                    "method": "createProcessoJudicial",
                    "data": [{"numero": str(self.numProcesso),
                              "numeroAlternativo": "",
                              "numeroAlternativoAscii": "",
                              "classeNacional_id": None,
                              "modalidadeInteressado_id": None,
                              "orgaoJulgador_id": None,
                              "dataHoraAjuizamento": None,
                              "dataHoraCitacao": None,
                              "dataHoraTransitoJulgado": None,
                              "competencia": "",
                              "codigoOrgaoJulgador": "",
                              "codigoLocalidade": "",
                              "nivelSigilo": "",
                              "intervencaoMP": False,
                              "AJG": False,
                              "tamanhoProcesso": "",
                              "valorCausa": 0,
                              "setor_id": self.setorDistribuidor,
                              "pasta_id": "",
                              "fonteDados": self.fonteDados,
                              "fonteDados_id": self.fonteDados_id,
                              "pessoa_id": int(self.entidade_id),
                              "pessoaInteressada_id": "",
                              "eletronico": False,
                              "numeroFormatado": "PENDENTE DE AJUIZAMENTO"}],
                    "type": "rpc",
                    "tid": int(self.tid)}

        return dict_payload

    def dict_createTarefa(self):

        #dá erro se setor distribuidor e destino forem o mesmo
        #quando distribui pra si e não dá ciência

        setorDistribuidor = self.setorDistribuidor
        setorDestino = self.setorDestino_id
        if str(setorDistribuidor) == str(setorDestino):
            setorDistribuidor = None

        dict_payload = {"action": "SapiensAdministrativo_Tarefa",
            "method": "createTarefa",
            "data": [{"observacao": str(self.observacao),
                "postIt":self.etiqueta,
                "urgente":False,
                "dataHoraInicioPrazo":self.inicioPrazo,
                "criadoEm":None,
                "apagadoEm":None,
                "atualizadoEm":None,
                "dataHoraFinalPrazo":self.fimPrazo,
                "dataHoraConclusaoPrazo":None,
                "pasta_id":self.IDPasta,
                "especieTarefa_id":self.especie_tarefa_id,
                "usuarioResponsavel_id":self.usuarioDestino,
                "setorResponsavel_id":self.setorDestino_id,
                "setorOrigem_id":setorDistribuidor,
                "documento_id":"",
                "acompanhar":False,
                "tramitar":True,
                "arquivar":"",
                "usuarioConclusaoPrazo_id":"",
                "criadoPor_id":"",
                "atualizadoPor_id":"",
                "acompanhada":False,
                "comunicacaoJudicial_id":self.IDIntimacao,
                "movimentoNacional_id":None,
                "modalidadeRepercussao_id":None,
                "replicar":False,
                "migrarEtiqueta":True,
                "redistribuida":False,
                "distribuicaoAutomatica":self.distribuicaoAutomatica,
                "idFormatado":""}],
            "type": "rpc",
            "tid": int(self.tid)}

        return dict_payload

    def dict_createVinculacaoPasta(self):

        dict_payload = {"action": "SapiensAdministrativo_VinculacaoPasta",
            "method": "createVinculacaoPasta",
            "data": [{"observacao": "CUMPRIMENTO DE SENTEN\u00c7A",
                "pasta_id": self.IDPasta,
                "pastaVinculada_id": self.IDPastaVinculada,
                "modalidadeVinculacaoPasta_id": 3,
                "criadoEm": None,
                "atualizadoEm": None,
                "apagadoEm": None,
                "criadoPor_id": "",
                "atualizadoPor_id": ""}],
            "type": "rpc",
            "tid": int(self.tid)}

        return dict_payload

    def dict_getComunicacaoJudicial(self):

        dict_payload = {"action": "SapiensJudicial_ComunicacaoJudicial",
                "method": "getComunicacaoJudicial",
                "data": [{"apagados": 0,
                    "fetch": ["processoJudicial",
                        "processoJudicial.orgaoJulgador",
                        "processoJudicial.classeNacional",
                        "modalidadeRepercussao",
                        "modalidadeComunicacaoJudicial",
                        "pasta",
                        "pasta.assuntos",
                        "pasta.assuntos.assuntoAdministrativo",
                        "pasta.pessoaRepresentada",
                        "pasta.pessoaInteressada",
                        "pasta.setor",
                        "pasta.setor.unidade",
                        "pasta.relevancias",
                        "pasta.lembretes",
                        "pasta.processoJudicial",
                        "setor.unidade",
                        "criadoPor"],
                    "filter": [
                        {"property": "id",
                            "value" : "eq:" + str(self.IDIntimacao)},
                        {"property": "tarefa",
                            "value": "isNull"}],
                    "distribuidos": 0,
                    "page": 1,
                    "start": 0,
                    "limit": "25",
                    "sort": [{"property": "dataHoraInicioPrazo",
                        "direction": "ASC"}]}],
                "type": "rpc",
                "tid": int(self.tid)}

        return dict_payload


    def dict_getPasta(self):

        dict_payload =  {"action": "SapiensAdministrativo_Pasta",
                    "method": "getPasta",
                    "data": [{"fetch": ["processoJudicial",
                                        "classificacao",
                                        "especiePasta",
                                        "modalidadeFase",
                                        "modalidadeMeio",
                                        "procedencia",
                                        "pessoaRepresentada",
                                        "setor", "setor.unidade"],
                              "filter": [{"property": "processoJudicial.id",
                                          "value": "eq:" + str(self.processo_id)}],
                              "page": 1,
                              "start": 0,
                              "limit": 25}],
                    "type": "rpc",
                    "tid": int(self.tid)}

        return dict_payload


    def dict_getPessoa(self):

        dict_payload = {"action": "SapiensMain_Pessoa"
                    ,"method": "getPessoa",
                    "data": [{"filter":
                        [{"property": "pessoaRepresentada","value": "eq:1"}],
                        "query": str(self.entidade_nome),
                        "page": 1,
                        "start": 0,
                        "limit": 25}],
            "type": "rpc",
            "tid": int(self.tid)}

        return dict_payload

    def dict_getProcessoJudicial(self):

        dict_payload = {"action": "SapiensJudicial_ProcessoJudicial",
                    "method": "getProcessoJudicial",
                    "data": [{"fetch": [],
                              "limit": 25,
                              "query": self.numProcesso,
                              "page": 1,
                              "start": 0}],
                    "type": "rpc",
                    "tid": int(self.tid)}

        return dict_payload

    def dict_getSetor(self):

        dict_payload = {"action": "SapiensMain_Setor",
                    "method": "getSetor",
                    "data": [{"fetch": ["especieSetor",
                        "parent",
                        "unidade",
                        "unidade.municipio",
                        "unidade.municipio.estado",
                        "municipio",
                        "municipio.estado"],
                        "filter": [{"property": "unidade.id",
                            "value": "eq:" + str(self.unidade_id)},
                            {"property": "parent",
                                "value": "isNotNull"}],
                        "query": self.setor_nome,
                        "page": 1,
                        "start": 0,
                        "limit": 25}],
                    "type": "rpc",
                    "tid": int(self.tid)}

        return dict_payload



    def dict_getUsuario(self):

        dict_payload = {"action": "SapiensMain_Usuario",
            "method": "getUsuario",
            "data": [{
                "sessao": "True",
                "fetch": ["colaborador",
                    "colaborador.modalidadeColaborador",
                    "colaborador.lotacoes",
                    "colaborador.lotacoes.setor",
                    "colaborador.lotacoes.setor.especieSetor",
                    "colaborador.lotacoes.setor.unidade",
                    "colaborador.lotacoes.setor.unidade.modalidadeOrgaoCentral",
                    "colaborador.lotacoes.setor.unidade.generoSetor"],
                "filter": [{
                    "property": "colaborador.lotacoes.id",
                    "value": "isNotNull"},
                    {"property": "colaborador.lotacoes.setor.ativo",
                        "value": "eq:1"}],
                "page": 1,
                "start": 0,
                "limit": 25}],
            "type": "rpc",
            "tid": int(self.tid)}

        return dict_payload


    def dict_sincronizaProcesso(self):

        dict_payload = {"comunicacoesJudiciaisId": str(self.IDIntimacao)}

        return dict_payload

    def dict_updateComunicacaoJudicial(self):

        dict_payload = {"action": "SapiensJudicial_ComunicacaoJudicial",
            "method": "updateComunicacaoJudicial",
            "data": [{"id": self.IDIntimacao,
                "movimentoNacional_id": "",
                "numero": self.numProcesso,
                "numeroAlternativo": "",
                "fonteDados_id": "",
                "fonteDados": self.fonteDados,
                "postIt": self.etiqueta,
                "modalidadeRepercussao_id": self.repercussao_id,
                "pasta_id": self.IDPasta,
                "idComunicacao": "",  # idComunicacao,
                "teor": self.teor,
                "nivelSigilo": "",
                "dataHoraInicioPrazo": self.inicioPrazo,
                "dataHoraFinalPrazo": self.fimPrazo,
                "pessoa_id": "",
                "modalidadeComunicacaoJudicial_id": self.modalidadeComunicacaoJudicial_id,
                "tarefa_id": "",
                "setor_id": self.setorDestino_id,
                "unidade_id": self.unidade_id,
                "processoJudicial_id": "",  # processoJudicial_id,
                "status": 1,
                "statusIntegracao": 0,
                "numeros": "",
                "criadoPor_id": "",
                "atualizadoPor_id": "",
                "criadoEm": "",  # criadoEm,
                "apagadoEm": None,
                "atualizadoEm": "",
                "centenaDistribuicao": self.centenaDistribuicao,
                "digitoDistribuicao": self.digitoDistribuicao,
                "poloEntidade": self.poloEntidade,
                "especieSetor_id": "",
                "criaAvocacao": False,
                "integracao": True,
                "idConsultante": self.idConsultante,
                "idFormatado": self.idFormatado}],
            "type": "rpc",
            "tid": int(self.tid)}

        return dict_payload

class Sapiens_requests_ordinary_procedures:

    def __init__(self, dict_post, cookie):#, cookie_timeout):

        self.dict_post = dict_post
        self.len_dict_post = len(str(self.dict_post))
        self.cookie = cookie
        #self.cookie_timeout = cookie_timeout
        self.header = self.request_header()

    def request_header(self):

        #if (self.cookie_timeout > datetime.now()):

        request_header = {
            'Cookie': self.cookie
        }
        '''
        request_header = {'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'Connection': 'keep-alive',
            'Content-Length': str(self.len_dict_post),
            'Content-Type': 'application/json',
            'Cookie': self.cookie,
            'Host': 'sapiens.agu.gov.br',
            'Origin': 'https://sapiens.agu.gov.br',
            'Referer': 'https://sapiens.agu.gov.br/',
            'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': "Windows",
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0(Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
            'X-File-Type': 'text/html',
            'X-Requested-With': 'XMLHttpRequest'
        }
        '''
        return True,request_header

       # else:
            #return False, 'Cookie expirado!'

    def ordinary_requisition(self, url_location="route"):

        header_success = self.header[0]
        headers = self.header[1]
        self.url_location = url_location
        print(headers)
        print(self.dict_post)

        if header_success:

            #######################################################################################
            ###########################REQUISIÇÃO COM TIMEOUT PREVISTO#############################
            #######################################################################################

            tentativa = 0
            status_requisicao = 500
            procedure_start = datetime.now()
            timeout = timedelta(0,180)
            procedure_end = procedure_start + timeout

            while not (status_requisicao == 200):

                try:
                    print(datetime.now())
                    print("tentativa_requisicao: " + str(tentativa))

                    with requests.post('https://sapiens.agu.gov.br/' + self.url_location,headers=headers,
                                                                json=self.dict_post,timeout=(5,15)) as m:
                        print("Status_code da requisicao" + str(m.status_code))
                        print(m.content)
                        status_requisicao = m.status_code
                        tentativa += 1
                        procedure_timerun = datetime.now()
                        if (procedure_timerun > procedure_end) or (tentativa > 5):
                            break
                except Exception as e:
                    print(e)
                    print("veio pro except da tentativa após o timeout")
                    tentativa += 1
                    procedure_timerun = datetime.now()
                    if (procedure_timerun > procedure_end) or (tentativa > 5):
                        print('parou pelo timerun no except')
                        break

            if status_requisicao == 200:
                valor_content = m.content
                soup = BeautifulSoup(valor_content,'html.parser')
                page_scripts_list = soup.find_all('html')
                if page_scripts_list != []:
                    return False,'Cookie do SAPIENS expirou. Não houve sucesso na consulta para este registro!'
                else:
                    valor = m.json()
                    return True, valor

        else:
            return False,headers

class Sapiens_requests_uploader_procedures:

    def __init__(self, conteudo="", file_name=None, cookie=None, cookie_timeout=None,
                 idPasta=None, ticket_upload=None, complemento=None, tipo_documento=None):

        self.conteudo = conteudo
        self.tamanho = len(str(self.conteudo))
        self.file_name = file_name
        self.cookie = cookie
        self.cookie_timeout = cookie_timeout
        self.idPasta = idPasta
        self.ticket_upload = ticket_upload
        self.complemento = complemento
        self.tipo_documento = tipo_documento
        self.upload_header = self.uploader_request_header()

    def uploader_request_header(self):

        if (self.cookie_timeout > datetime.now()):

            request_header = {'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
                'Connection': 'keep-alive',
                'Content-Length': str(self.tamanho),
                'Content-Type': 'application/binary',
                'Cookie': self.cookie,
                'Host': 'sapiens.agu.gov.br',
                'Origin': 'https://sapiens.agu.gov.br',
                'Referer': 'https://sapiens.agu.gov.br/',
                'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
                'sec-ch-ua-mobile': '?0',
                'Sec-Fetch-Dest': 'empty',
                'sec-ch-ua-platform': "Windows",
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0(Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
                'X-File-Name': self.file_name,
                'X-File-Size': str(self.tamanho),
                'X-File-Type': 'text/html',
                'X-Requested-With': 'XMLHttpRequest'}

            return True,request_header

        else:
            return False,'Cookie expirado!'

    def upload_file_requisition(self):

        header_success = self.upload_header[0]
        headers = self.upload_header[1]
        print(headers)

        if header_success:

            #######################################################################################
            ###########################REQUISIÇÃO COM TIMEOUT PREVISTO#############################
            #######################################################################################

            tentativa = 0
            status_requisicao = 500
            procedure_start = datetime.now()
            timeout = timedelta(0,180)
            procedure_end = procedure_start + timeout

            while not (status_requisicao == 200):

                try:
                    print(datetime.now())
                    print("tentativa_requisicao: " + str(tentativa))

                    url_post = "https://sapiens.agu.gov.br/upload_pasta?pasta=" + str(self.idPasta) + "&ticket_upload=" + \
                               self.ticket_upload + "&tipoDocumento=" + str(self.tipo_documento) + \
                               "&complementoMovimento=" + str(self.complemento)

                    with requests.post(url_post,headers=headers, data=self.conteudo,timeout=(5,15)) as m:
                        print("Status_code da requisicao" + str(m.status_code))
                        print(m.content)
                        status_requisicao = m.status_code
                        tentativa += 1
                        procedure_timerun = datetime.now()
                        if (procedure_timerun > procedure_end) or (tentativa > 5):
                            break
                except Exception as e:
                    print(e)
                    print("veio pro except da tentativa após o timeout")
                    tentativa += 1
                    procedure_timerun = datetime.now()
                    if (procedure_timerun > procedure_end) or (tentativa > 5):
                        print('parou pelo timerun no except')
                        break

            if status_requisicao == 200:
                valor_content = m.content
                soup = BeautifulSoup(valor_content,'html.parser')
                page_scripts_list = soup.find_all('html')
                if page_scripts_list != []:
                    return False,'Cookie do SAPIENS expirou. Não houve sucesso na consulta para este registro!'
                else:
                    valor = m.json()
                    return True,valor
        else:
            return False,headers

if __name__ == '__main__':

    #inicial_token = Access_sapiens(cpf='21631424858', senha='Brugio2021').get_inicial_page_token()
    #print(inicial_token)
    # acesso = Access_sapiens(cpf='21631424858',senha='Brugio2021')
    acesso = Access_sapiens(cpf='02127337298',senha='Senhasenh4')
    tuple_cookie = acesso.cookie
    print(tuple_cookie)
    # if tuple_cookie[0]:
    #     tid = acesso.tid
    #     print(tid)
    #     payload = Requests_payloads_sapiens(tid=tid).dict_getUsuario()
    #     #print(payload)
    #     response = Sapiens_requests_ordinary_procedures(dict_post=payload, cookie=tuple_cookie[1]).ordinary_requisition()
    #     print(response)
