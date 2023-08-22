import { parse } from "date-fns";
export function VerificaçaoSeDosPrevInvalido(dosPrev: string): boolean {
    //Exemplo: dosprev = * "Informações extraídas dos sistemas informatizados do INSS em: 10/08/2022 11:58:28"
    //Obtendo somente a data em string
    const dateString = dosPrev.split(": ")[1];

    // Converter a string para um objeto Date
    const dateObject = parse(dateString, "dd/MM/yyyy HH:mm:ss", new Date());

    // Calcular a diferença entre a data fornecida e a data atual em milisegundos
    const difference = Date.now() - dateObject.getTime();

    // Converter a diferença de milisegundos para dias
    const differenceInDays = difference / (1000 * 60 * 60 * 24);

    // Verificar se a diferença é maior que 30 dias
    if (differenceInDays > 30) {
        return true;
    } else {
        return false;
    }
}