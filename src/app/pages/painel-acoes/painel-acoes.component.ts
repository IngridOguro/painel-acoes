import { Component, OnInit } from '@angular/core';
import { PainelAcoesService } from '../../services/painel-acoes.service';
import {JsonPipe} from '@angular/common'
import { NgIf, NgFor, NgClass,DecimalPipe } from '@angular/common';
import { Acao } from '../../models/acoes.model';

@Component({
  selector: 'app-painel-acoes',
  standalone: true,
  imports: [JsonPipe,NgIf,NgFor,NgClass,DecimalPipe],
  templateUrl: './painel-acoes.component.html',
  styleUrl: './painel-acoes.component.css'
})
export class PainelAcoesComponent implements OnInit{

  stocks: Acao[] = [];
  loading = false;
  error = false;

 constructor(private painelAcoesService: PainelAcoesService) {}

  ngOnInit(): void {
    this.carregarAcoes();
  }

  carregarAcoes(): void {
  this.loading = true;
  this.error = false;

  this.painelAcoesService.obterAcoes(['ITUB4']).subscribe({
    next: (response) => {
      this.stocks = this.mapearAcoes(response.stocks);
      this.loading = false;
    },
    error: () => {
      this.error = true;
      this.loading = false;
    }
  });
}

  mapearAcoes(results: any[]): Acao[] {
  return results.map((item): Acao => ({
    stock: item.stock,
    name: item.name,
    close: item.close,
    closeString: this.formatarDuasCasas(item.close),
    change:item.change,
    changeString: this.formatarDuasCasas(item.change),
    volume:this.formatarNumeroGrande(item.volume),
    marketcap:this.formatarNumeroGrande(item.market_cap),
    logo:item.logo,
    sector:item.sector,
    type:item.type
  }))
  }

getClasseVariacao(valor: number): string {
  if (valor > 0) return 'valor-positivo';
  if (valor < 0) return 'valor-negativo';
  return 'valor-zero';
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
