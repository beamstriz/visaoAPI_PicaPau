export function encontrarDataMaisAtual(dates: Date[]): Date | null {
    if (dates.length === 0) {
      return null;
    }
  
    const mostRecentDate = dates.reduce((currentMax, dateStr) => {
      const date = new Date(dateStr);
      if (!isNaN(date.getTime()) && date > currentMax) {
        return date;
      }
      return currentMax;
    }, new Date(0));
  
    return mostRecentDate;
  }