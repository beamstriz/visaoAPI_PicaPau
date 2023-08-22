import fs from 'fs';
import PDFParser from 'pdf-parse';

// Função para ler o arquivo PDF e retornar o conteúdo em JSON
export async function readPDF(pdfPath: string): Promise<any> {
  // Lê o arquivo PDF
  const pdfBuffer = fs.readFileSync(pdfPath);

  // Utiliza a biblioteca PDFParser para converter o buffer em JSON
  const pdfData = await PDFParser(pdfBuffer);
  
  return pdfData.text;
}

// Utilização da função
