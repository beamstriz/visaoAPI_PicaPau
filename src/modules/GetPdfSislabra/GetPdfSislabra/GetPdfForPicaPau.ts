/* import axios, { AxiosRequestConfig } from 'axios';
import fs from 'fs';

export async function downloadPDFWithCookies(url: string, filename: string, cookies: string) {
  const config: AxiosRequestConfig = {
    url,
    method: 'GET',
    responseType: 'arraybuffer',
    headers: {
      'Cookie': cookies,
    },
  };

  const response = await axios(config);

  fs.writeFileSync(filename, Buffer.from(response.data));
  console.log(response.data)
}

const url = 'https://www.example.com/file.pdf';
const filename = 'file.pdf';
const cookies = 'session=abcdefg; user_id=123';

 */
import axios from 'axios';
import fs from 'fs';
import path from 'path';

async function downloadPDFWithCookies(url: string, cookies: string): Promise<void> {
  const response = await axios.get(url, {
    headers: {
      Cookie: cookies,
      'Content-Type': 'application/pdf',
    },
    responseType: 'arraybuffer',
  });

  const filePath = path.join(__dirname, 'sislabra.pdf');
 /* const filePath = path.join('resources/app/build/modules/GetPdfSislabra/GetPdfSislabra/sislabra.pdf'); */
  //console.log(filePath);
  fs.writeFileSync(filePath, response.data);
}


function deletePDF(filename: string): void {
    const filePath = path.join(__dirname, filename);
    /* const filePath = path.join('resources/app/build/modules/GetPdfSislabra/GetPdfSislabra/sislabra.pdf'); */
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`${filename} was deleted successfully`);
    });
  }

  export {downloadPDFWithCookies, deletePDF}