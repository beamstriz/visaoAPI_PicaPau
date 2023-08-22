

export class SeruradoEspecial{
    async handle(parginaDosPrev: any): Promise<number>{
                    const procurarVariavelSeguradoEspecial: number = parginaDosPrev.indexOf("SEGURADO_ESPECIAL");
                    return procurarVariavelSeguradoEspecial;
                    /* if(procurarVariavelSeguradoEspecial !== -1){
                        response2.push("CONCESSÃO ANTERIOR")
                    } */
    }
    
}
