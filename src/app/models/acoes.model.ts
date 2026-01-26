import { AcaoDetalhe } from "./acao.model";

export interface Acao {
  stock: string;
  name: string;
  close: number;
  closeString: string;
  change:number;
  changeString:string;
  volume:string;
  marketcap:string;
  logo:string;
  sector:string;
  type:string;
  detalhes: AcaoDetalhe | null;
}
