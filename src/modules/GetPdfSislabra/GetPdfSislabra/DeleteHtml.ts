const fs = require('fs');

export async function excluirArquivosComPrefixo(): Promise<any> {
  try {
    const arquivos = fs.readdirSync(__dirname);

    arquivos.forEach((arquivo) => {
      if (arquivo.startsWith("tester")) {
        const caminhoArquivo = `${__dirname}/${arquivo}`;
        fs.unlinkSync(caminhoArquivo);
        console.log(`Arquivo ${arquivo} excluído com sucesso.`);
      }
    });
  } catch (error) {
    console.error(`Erro ao ler o diretório: ${error.message}`);
  }
}

// Exemplo de uso:
