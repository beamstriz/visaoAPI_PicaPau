import { IHeaderUploadArquivoDTO } from '../../DTO/HeaderUploadArquivoDTO';

export class RequestHeaderUploadArquivo {
    async execute(data: IHeaderUploadArquivoDTO): Promise<any> {

        const requestHeaderUploadArquivo = {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'Connection': 'keep-alive',
            'Content-Length': `${data.tamanho}`,
            'Content-Type': 'application/binary',
            'Cookie': data.cookie,
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
            'X-File-Name': data.file_name,
            'X-File-Size': `${data.tamanho}`,
            'X-File-Type': 'text/html',
            'X-Requested-With': 'XMLHttpRequest'
        }
        requestHeaderUploadArquivo.Cookie = await requestHeaderUploadArquivo.Cookie.replace("\n", "");

        return requestHeaderUploadArquivo;
    }
}