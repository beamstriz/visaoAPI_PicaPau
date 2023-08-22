const { Poppler } = require("node-poppler");
import { promisify } from "util";
const fs = require("fs");


export async function criarHtml():Promise<void>{
                    const readFile = promisify(fs.readFile);
                    const writeFile = promisify(fs.writeFile);
                    try{
                        console.log("entrou na funcao html");
                        const file = await readFile(__dirname+'/sislabra.pdf');
                        const poppler = new Poppler();
                        const options = {
                            firstPageToConvert: 2,
                            lastPageToConvert: 5,
                        };
                        await poppler.pdfToHtml(file,__dirname+'/tester.html', options); 
                    }catch(err){
                        console.log(console.error('Erro ao criar o arquivo html'))
                    }
                    

                     
}