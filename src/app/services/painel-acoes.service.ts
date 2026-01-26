import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PainelAcoesService {
  private baseUrl = 'https://brapi.dev/api/quote';
  private readonly token = 'kMQQvei35hYMNqzH58pm4m';

  constructor(private http: HttpClient) { }

  obterAcoes() {
    const url =
    `${this.baseUrl}/list/?limit=50&token=${this.token}`;

  return this.http.get<any>(url, {
    responseType: 'json'
  });
  }

  obterAcao(ticket:string) {
    const url =
    `${this.baseUrl}/${ticket}?range=1mo&interval=1d&token=${this.token}`;

  return this.http.get<any>(url, {
    responseType: 'json'
  });
  }

}
