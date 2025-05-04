export interface City {
  id: string;
  nome: string;
  microrregiao: {
    nome: string;
    mesorregiao: {
      nome: string;
      UF: {
        nome: string;
        sigla: string;
      };
    };
  };
  ["regiao-imediata"]: {
    nome: string;
  };
}
