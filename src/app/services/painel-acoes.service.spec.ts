import { TestBed } from '@angular/core/testing';

import { PainelAcoesService } from './painel-acoes.service';

describe('PainelAcoesService', () => {
  let service: PainelAcoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PainelAcoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
