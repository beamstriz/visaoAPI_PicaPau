/* export function converterDatasParaDate(datas: string[]): Date[] {
    const datasEmDate: Date[] = [];
  
    for (const data of datas) {
      const dataEmDate = new Date(data);
      datasEmDate.push(dataEmDate);
    }
  
    return datasEmDate;
  } */
 export  function converterDatasParaDate(texto: string): Date[] {
    const regex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
  const matches = texto.match(regex);

  if (!matches) {
    return [];
  }

  const datas = matches.map((match) => {
    const partes = match.split('/').map((parte) => parseInt(parte));
    return new Date(partes[2], partes[1] - 1, partes[0]);
  });

  return datas;
}
  