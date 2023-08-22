import moment from "moment";
/* export function ordenarDatas(str: string): Date[] {
    const regex = /(\d{2})\/(\d{2})\/(\d{4})/g; // expressão regular para buscar datas no formato dd/mm/aaaa
    const dates: Date[] = [];
  
    let match;
    while ((match = regex.exec(str))) {
      const [_, day, month, year] = match;
      const momentDate = moment(`${day}/${month}/${year}`, 'DD/MM/YYYY');
      dates.push(momentDate.toDate());
    }
  
    dates.sort((a, b) => a.getTime() - b.getTime()); // ordena as datas em ordem crescente
  
    return dates;
  } */


 
  
export function ordenarDatas(str: string): string {
  const regex = /(\d{2}\/\d{2}\/\d{4})|(\d{2}\/\d{4})/g; // regex para buscar datas no formato DD/MM/YYYY ou MM/YYYY
  const dates: string[] = [];

  let match;
  while ((match = regex.exec(str))) {
    dates.push(match[0]); // adiciona a data encontrada ao array
  }

  dates.sort((a, b) => {
    const dateA = new Date(a.replace('/', '-'));
    const dateB = new Date(b.replace('/', '-'));
    return dateA.getTime() - dateB.getTime(); // ordena as datas em ordem crescente
  });
  if(dates[1].length == 7){
    const data = dates[1];
    dates[1] = `01/`+ data
  }

  const d = dates.join(',')
  return d
}