import moment from 'moment';
/* export function extractDatesFromString(date1: Date, date2: Date): Date {
    

    if (date1 > date2) {
      return date1;
    } else {
      return date2;
    }

}
   */


export function extractDatesFromString(text: string): Date[] {
    const dateRegex = /\d{2}\/\d{2}\/\d{4}/g; // Expressão regular para encontrar datas no formato dd/mm/aaaa
    const matches = text.match(dateRegex); // Retorna um array com todas as datas encontradas no texto
    const date = moment(matches, 'DD/MM/YYYY').toDate();
  
    if (date) {
      return [date];  // Converte cada data em um objeto Date e retorna um array de datas
    } else {
      return []; // Se não houver datas, retorna um array vazio
    }
  }
 /* export function extractDatesFromString(text: string): Date | null {
    const regex = /\d{4}-\d{2}-\d{2}/; // Expressão regular para encontrar uma data no formato "yyyy-mm-dd"
    const match = text.match(regex); // Procura a primeira ocorrência da expressão regular na string
  
    if (match) {
      const dateString = match[0]; // Extrai a string da data encontrada
      const date = new Date(dateString); // Cria um objeto Date com a string da data
      return date;
    } else {
      return null; // Retorna nulo se nenhuma data for encontrada
    }
  } */