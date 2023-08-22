
export class RequestHeadersLogingCheck {
    async execute(cookie: string): Promise<any> {

        const RequestHeadersLoginCheck = {
            'Host': 'sapiens.agu.gov.br',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': 112,
            'Origin': 'https://sapiens.agu.gov.br',
            'Connection': 'keep-alive',
            'Referer': 'https://sapiens.agu.gov.br/login',
            'Cookie': cookie,
            'Upgrade-Insecure-Requests': 1,
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin'
        }
        // RequestHeadersLoginCheck.Cookie = await RequestHeadersLoginCheck.Cookie.replace('\n', '');
        return RequestHeadersLoginCheck;
    }
}
