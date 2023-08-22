export function correçaoDoErroDeFormatoDoSapiens(texto: string): string {
    if (texto == null) {
        return null;
    }
    return texto.replace(/\s+/g, '')
}