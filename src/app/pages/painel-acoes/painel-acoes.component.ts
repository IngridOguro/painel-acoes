import { Component, OnInit } from '@angular/core';
import { PainelAcoesService } from '../../services/painel-acoes.service';
import { NgIf, NgFor, NgClass, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Acao } from '../../models/acoes.model';
import { AcaoDetalhe } from '../../models/acao.model';

@Component({
  selector: 'app-painel-acoes',
  standalone: true,
  imports: [NgIf,NgFor,NgClass, CommonModule,FormsModule ],
  templateUrl: './painel-acoes.component.html',
  styleUrl: './painel-acoes.component.css'
})
export class PainelAcoesComponent implements OnInit{

  stocks: Acao[] = [];
  stock: any;
  loading = false;
  error = false;
  paginaAtual = 1;
  itensPorPagina = 15;
  totalItens=0;
  linhaExpandida: string | null = null;

 constructor(private painelAcoesService: PainelAcoesService) {}

  ngOnInit(): void {
    this.carregarAcoes();

  }

  expandirDetalhes(stock: Acao): void {
  if (this.linhaExpandida === stock.stock) {
    this.linhaExpandida = null;
  } else {
    this.linhaExpandida = stock.stock;
  }
  this.carregarAcao(stock.stock);

}

  carregarAcao(ticket:string):void{
  this.painelAcoesService.obterAcao(ticket).subscribe({
    next: (response) => {
      const detalhes = this.mapearAcao(response.results[0]);
      const acao = this.stocks.find(s => s.stock === ticket);
      if (acao) {
        acao.detalhes = detalhes;
      }
    },
    error: () => {
      this.error = true;
      this.loading = false;
    }
  });

  }

get stocksPaginados(): Acao[] {
  const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
  const fim = inicio + this.itensPorPagina;
  return this.stocksFiltrados.slice(inicio, fim);
}

filtroCodigo: string = '';

get stocksFiltrados(): Acao[] {
  if (!this.filtroCodigo) {
    return this.stocks;
  }

  return this.stocks.filter(stock =>
    stock.stock.toLowerCase().includes(this.filtroCodigo.toLowerCase())
  );
}

colunaOrdenada: string | null = null;
ordemAscendente: boolean = true;

ordenarPor(coluna: keyof Acao): void {
  if (this.colunaOrdenada === coluna) {
    this.ordemAscendente = !this.ordemAscendente;
  } else {
    this.colunaOrdenada = coluna;
    this.ordemAscendente = true;
  }

  this.stocks.sort((a, b) => {
    const valA = a[coluna];
    const valB = b[coluna];

    if (typeof valA === 'string' && typeof valB === 'string') {
      return this.ordemAscendente
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    if (typeof valA === 'number' && typeof valB === 'number') {
      return this.ordemAscendente ? valA - valB : valB - valA;
    }

    return 0;
  });
}


  carregarAcoes(): void {
  this.loading = true;
  this.error = false;

  this.painelAcoesService.obterAcoes().subscribe({
    next: (response) => {
      this.stocks = this.mapearAcoes(response.stocks);
      this.totalItens = this.stocks.length;
      this.loading = false;
    },
    error: () => {
      this.error = true;
      this.loading = false;
    }
  });
}

  mapearAcao(results: any): AcaoDetalhe {
    return {
    priceEarnings: results.priceEarnings,
    priceEarningsString:  this.formatarDuasCasas(results.priceEarnings),
    earningsPerShare: results.earningsPerShare ,
    earningsPerShareString: this.formatarDuasCasas(results.earningsPerShare),
    marketCap: results.marketCap ,
    fiftyTwoWeekLow: results.fiftyTwoWeekLow ,
    fiftyTwoWeekLowString: this.formatarDuasCasas(results.fiftyTwoWeekLow) ,
    fiftyTwoWeekHigh: results.fiftyTwoWeekHigh ,
    fiftyTwoWeekHighString: this.formatarDuasCasas(results.fiftyTwoWeekHigh) ,
    fiftyTwoWeekRange: results.fiftyTwoWeekRange ,
    regularMarketOpen: results.regularMarketOpen ,
    regularMarketOpenString: this.formatarDuasCasas(results.regularMarketOpen) ,
    regularMarketPreviousClose: results.regularMarketPreviousClose ,
    regularMarketPreviousCloseString: this.formatarDuasCasas(results.regularMarketPreviousClose) ,
    regularMarketPrice: results.regularMarketPrice ,
    regularMarketTime: this.formatarData(results.regularMarketTime)
    }
  }

  mapearAcoes(results: any[]): Acao[] {
  return results.map((item): Acao => ({
    stock: item.stock,
    name: item.name,
    close: item.close,
    closeString: this.formatarDuasCasas(item.close),
    change:item.change,
    changeString: this.formatarDuasCasas(item.change),
    volume:item.volume,
    volumeString:this.formatarNumeroGrande(item.volume),
    marketcap:item.market_cap,
    marketcapString:this.formatarNumeroGrande(item.market_cap),
    logo:item.logo,
    sector:item.sector,
    type:item.type,
    detalhes:null
  }))
  }

getClasseVariacao(valor: number): string {
  if (valor > 0) return 'valor-positivo';
  if (valor < 0) return 'valor-negativo';
  return 'valor-zero';
  }

formatarData(dataIso: string | null | undefined): string {
  if (!dataIso) {
    return 'N/A';
  }

  const data = new Date(dataIso);

  return data.toLocaleDateString('pt-BR');
}


formatarDuasCasas(valor: number | null | undefined): string {
  if (valor == null){
    return 'N/A';
  }
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

formatarNumeroGrande(value: number | null | undefined): string {
  if (value == null){
    return 'N/A';
  }

  const formatos = [
    { limite: 1_000_000_000, sufixo: 'B', casas: 1 },
    { limite: 1_000_000, sufixo: 'M', casas: 1 },
    { limite: 1_000, sufixo: 'k', casas: 0 }
  ];

  for (const f of formatos) {
    if (value >= f.limite) {
      return (value / f.limite).toFixed(f.casas).replace('.', ',') + f.sufixo;
    }
  }
  return value.toString().replace('.',',');
}

}
