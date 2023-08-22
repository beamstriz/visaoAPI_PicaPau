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
                return True, dict_cookie
            if len(self.cookies_values_internal_page_list) == 1:
                cookie_name_2 = self.cookies_keys_internal_page_list[0]
                cookie_value_2 = self.cookies_values_internal_page_list[0]
                dict_cookie = f'{str(cookie_name_2)}={str(cookie_value_2)}'
                return True, dict_cookie
            else:
                return False, 'Houve um problema na tentativa de captar o cookie de acesso. Tente novamente!'
        else:
            return False, 'Acesso negado, verifique se o CPF e a senha estão corretos!'


    def get_tid(self):
        self.tid = self.tid + 1
        return str(self.tid)




import sys
if __name__ == '__main__':

    #inicial_token = Access_sapiens(cpf='21631424858', senha='Brugio2021').get_inicial_page_token()
   # print(inicial_token)
    cpf = sys.argv[1]
    senha = sys.argv[2]
    # print(cpf, senha)
    acesso = Access_sapiens(cpf=cpf,senha=senha)
    tuple_cookie = acesso.cookie
    #tuple_cookie = str(sys.argv[1])
    print(tuple_cookie[1])
   
