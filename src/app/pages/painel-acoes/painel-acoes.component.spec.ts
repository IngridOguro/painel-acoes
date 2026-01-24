import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelAcoesComponent } from './painel-acoes.component';

describe('PainelAcoesComponent', () => {
  let component: PainelAcoesComponent;
  let fixture: ComponentFixture<PainelAcoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelAcoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelAcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
