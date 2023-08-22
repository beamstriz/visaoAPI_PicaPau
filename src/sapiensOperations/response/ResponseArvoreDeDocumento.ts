export type ResponseArvoreDeDocumento = {
    id: number;
    uuid: string;
    numeracaoSequencial: number;
    ativo: boolean;
    vinculada: boolean;
    movimento: string;
    criadoEm: {
      date: string;
    };
    atualizadoEm: {
      date: string;
    };
    documentoJuntado: {
      id: number;
      uuid: string;
      numeroFolhas: number;
      dataHoraProducao: {
        date: string;
      };
      visibilidadeRestrita: boolean;
      semEfeito: boolean;
      descricaoOutros: string;
      minuta: boolean;
      copia: boolean;
      criadoEm: {
        date: string;
      };
      atualizadoEm: {
        date: string;
      };
      origemDados: {
        id: number;
        idExterno: string;
        dataHoraUltimaConsulta: {
          date: string;
        };
        servico: string;
        fonteDados: string;
        status: number;
        criadoEm: {
          date: string;
        };
        atualizadoEm: {
          date: string;
        };
      };
      tipoDocumento: {
        id: number;
        sigla: string;
        nome: string;
        descricao: string;
        ativo: boolean;
        criadoEm: {
          date: string;
        };
        atualizadoEm: {
          date: string;
        };
      };
      componentesDigitais: [
        {
          id: number;
          uuid: string;
          fileName: string;
          hash: string;
          numeracaoSequencial: number;
          indexado: boolean;
          versoesEliminadas: boolean;
          tamanho: number;
          nivelComposicao: number;
          mimetype: string;
          extensao: string;
          editavel: boolean;
          criadoEm: {
            date: string;
          };
          atualizadoEm: {
            date: string;
          };
        }
      ];
      anotacoes: any[];
      origemDados_id: number;
      tipoDocumento_id: number;
    };
    leaf: boolean;
    documentoJuntado_id: number;
    processo_id: number;
    usuario_id: number;
    setor_id: number;
  }