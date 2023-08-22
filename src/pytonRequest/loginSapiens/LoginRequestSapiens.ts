import axios, { AxiosRequestHeaders } from "axios";
import { ILoginDTO } from "../../DTO/LoginDTO";
import { parse, HTMLElement } from 'node-html-parser';
import { RequestHeaders } from "../../sapiensOperations/resquest/RequestHeaders";
import { RequestHeadersLogingCheck } from '../../sapiensOperations/resquest/RequestHeadersLoginCheck';
var querystring = require('querystring');

interface heards {
    token: string;
    arrayCookie: string[];
}
export class RequestLoginSapiens {
    private urlSapiens = 'https://sapiens.agu.gov.br/';
    private extesionUrlSapiens_loginCheck = 'login_check'
    private extesionUrlSapiens_login = 'login'
    private sessao = axios.create({ baseURL: this.urlSapiens })
    private token: string
    private requestHeaders = new RequestHeaders()
    private headers: any;
    constructor(private login: ILoginDTO) { }
    async handle(): Promise<string> {
        const requestHeadersLogingCheck = new RequestHeadersLogingCheck()
        var cookie: string;
        let headers = await this.getInicialToken();
        this.token = headers.token;
        cookie = (await this.getCookie(headers.arrayCookie));
        this.headers = requestHeadersLogingCheck.execute(cookie);
        cookie = await this.getCookie(await this.getLoginCookies());
        // console.log("cookie: ", cookie);

        return cookie
    }
    private async getInicialToken(): Promise<heards> {
        const getSapiensExternalPage = await this.sessao.get(`${this.extesionUrlSapiens_login}`,);
        const htmlPageLogin = getSapiensExternalPage.data;
        const root: HTMLElement = parse(htmlPageLogin);
        const token = root.querySelector('input')!.getAttribute('value')!;
        // console.log(getSapiensExternalPage.headers["set-cookie"][0] + "; " + getSapiensExternalPage.headers["set-cookie"][1])
        // console.log("set-cookie token: ",getSapiensExternalPage)
        return { token, arrayCookie: getSapiensExternalPage.headers["set-cookie"] };
    }
    private async getLoginCookies(): Promise<string[]> {
        const dictPost = {
            "_csrf_token": this.token,
            "_username": `${this.login.cpf}`,
            "_password": `${this.login.senha}`,
            "_submit": 'Login',
        };
        console.log(querystring.stringify(dictPost))
        const request = await this.sessao.post(`${this.extesionUrlSapiens_loginCheck}`, (dictPost), { headers: this.headers });
        const cookiesLogado = request.headers["set-cookie"];
        // console.log("request: " + request.data);
        //console.log("Cookie: ", cookiesLogado)
        // console.log("data: ",request.data)
        return cookiesLogado;
    }
    private async getCookie(Arraycookie: string[]): Promise<string> {
        let cookie1: string;
        let cookie2: string;
        if (Arraycookie.length != 2) {
            cookie1 = Arraycookie[0].split(';')[0];
        } else {
            cookie1 = Arraycookie[0].split(';')[0];
            cookie2 = Arraycookie[1].split(';')[0];
        }
        return cookie1 + "; " + cookie2;
    }

}

// PHPSESSID=514d4d7f8e3ae643dff948c87776f557; dtCookie=1$DD6ACE967EFB9B97B92868C8E39403FE
// PHPSESSID=fd59a248d862616d0887f928045ba978; dtCookie=1$D4AF598446FF6B952A1A728F3DEF1824

// n
// _csrf_token=IoHhknhdPjHYDQfs-892XNc6dNqaOynWpxftcIstKrs&_username=2127337298&_password=Senhasenh4&_submit=Login