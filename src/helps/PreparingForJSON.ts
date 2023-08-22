export class PreparingForJSON {
    async execute(data: Buffer): Promise<string> {
        for(let i = 0; i < data.length; i++) {
            //troca " por '
            if(data[i] == 34){
                data[i] = 39
            }
            //troca ' por "
            else if(data[i] == 39){
                data[i] = 34
            }
            //troca T por t
            else if(data[i] == 84 && i > 0 && data[i - 1] == 32){
                data[i] = 116
            }
            //troca F por f
            else if(data[i] == 70 && i > 0 && data[i - 1] == 32){
                data[i] = 102
            }

        }
        return data.toString();
    }
}