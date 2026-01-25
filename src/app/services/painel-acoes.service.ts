import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PainelAcoesService {
  private baseUrl = 'https://brapi.dev/api/quote/list';
  private readonly token = 'kMQQvei35hYMNqzH58pm4m';

  constructor(private http: HttpClient) { }

  obterAcoes(tickers: string[]) {
    const url =
    `${this.baseUrl}/?limit=50&token=${this.token}`;

  console.log('URL da requisição:', url);

  return this.http.get<any>(url, {
    responseType: 'json'
  });
  }

}
