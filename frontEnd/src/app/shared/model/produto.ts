// export class Produto {
//   constructor(
//   public id: number,
//   public nome: string,
//   public dataCompra: Date,
//   public duracaoGarantiaMeses: number,
//   public dataFimGarantia: string,
//   )
//   {}
// }

import { Marca } from "./marca";

export class Produto {
  id?: string;
  nome: string;
  dataCompra: Date;
  duracaoGarantiaMeses: number;
  dataFimGarantia?: Date;
  marcaId: string;

  marca?: Marca;

  constructor(nome: string, dataCompra: Date, duracaoGarantiaMeses: number, dataFimGarantia: Date, marcaId: string) {
    this.nome = nome;
    this.dataCompra = dataCompra;
    this.duracaoGarantiaMeses = duracaoGarantiaMeses;
    this.dataFimGarantia = dataFimGarantia;
    this.marcaId = marcaId;
  }
}
