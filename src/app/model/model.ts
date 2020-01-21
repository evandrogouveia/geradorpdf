export class Certificado {
  id: number;
  numero_certificado: number;
  data_certificado: string;
  cnpj_cliente: string;
  nome_cliente: string;
  codigo_produto: string;
  certificado: string;
  descricao: string;
  nota_fiscal: string;
  descricaoproduto: string;
  quantidade: string;
  rastreabilidade: string;
  observacao: string;
  material: string;
  fator_seguranca: any;
  carga_vertical: any;
  fator_vertical: any;
  carga_basket: any;
  fator_basket: any;
  carga_chocker: any;
  fator_chocker: any;
  tipo: string;
}

export class Clientes {
  id: number;
  cnpj: string;
  nome: string;
}

export class Produtos {
  codigo: string;
  descricao: string;
}