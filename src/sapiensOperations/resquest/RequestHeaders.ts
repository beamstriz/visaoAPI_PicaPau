
export class RequestHeaders {
    async execute(cookie: string): Promise<any> {

        const RequestHeaders = {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'Connection': 'keep-alive',
            'Cookie': `${cookie}`,
            'Host': 'sapiens.agu.gov.br',
            'Origin': 'https://sapiens.agu.gov.br',
            'Referer': 'https://sapiens.agu.gov.br/',
            'sec-ch-ua': "'Google Chrome';v='95', 'Chromium';v='95', ';Not A Brand';v='99'",
            'sec-ch-ua-mobile': '?0',
            'Sec-Fetch-Dest': 'empty',
            'sec-ch-ua-platform': 'Windows',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0(Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
            'X-File-Type': 'text/html',
            'X-Requested-With': 'XMLHttpRequest'
        }
        RequestHeaders.Cookie = await RequestHeaders.Cookie.replace("\n", "");
        return RequestHeaders;
    }
}