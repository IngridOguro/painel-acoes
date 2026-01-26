import { AcaoDetalhe } from "./acao.model";

export interface Acao {
  stock: string;
  name: string;
  close: number;
  closeString: string;
  change:number;
  changeString:string;
  volume:number;
  volumeString:string;
  marketcap:number;
  marketcapString:string;
  logo:string;
  sector:string;
  type:string;
  detalhes: AcaoDetalhe | null;
}
