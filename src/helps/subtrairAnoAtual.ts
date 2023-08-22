export function SubtrairAnoMaisAtual(dataMaisAtual: Date, anos: number): Date {
    const data: Date = new Date(dataMaisAtual);
    data.setFullYear(data.getFullYear() + anos);
    return data;
  }