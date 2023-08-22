const fs = require("fs");
import { promisify } from "util";

 export async function lePdf(){

    let result: any = "";
    const readFile = promisify(fs.readFile);
    console.log("Entrou lêPDF")
    const valor =  fs.readFileSync(__dirname+'/testers.html', 'utf8');
        if(valor.indexOf("Salário Contrato") == -1){
          return null;
        }
        const xx = valor.split('Vínculos Empregatícios');
        
        const xxx = xx[1].split('Bens Declarados ao TSE');
        
        
        //console.log(xxx[0]);
        const regex = /\b\d{1,3}(?:\.\d{3})*(?:,\d{2})\b/g;
        const matches = `${xxx[0]}`.match(regex);
       
        
        
        if(matches == null || matches == undefined){
          return null;
        }
        
        const impares = [];
        for (let i = 1; i < matches.length; i += 2) {
        impares.push(matches[i]);
        }
        
        
       
        return impares;
      
     
}