import { Component, OnInit } from '@angular/core';
import { PainelAcoesService } from '../../services/painel-acoes.service';
import {JsonPipe} from '@angular/common'
import { NgIf, NgFor } from '@angular/common';
import { Acao } from '../../models/acoes.model';

@Component({
  selector: 'app-painel-acoes',
  standalone: true,
  imports: [JsonPipe,NgIf,NgFor],
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
    change:item.change,
    volume:item.volume,
    marketcap:item.market_cap,
    logo:item.logo,
    sector:item.sector,
    type:item.type
  }))
}


}
