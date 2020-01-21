import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevacaoComponent } from './elevacao.component';

describe('ElevacaoComponent', () => {
  let component: ElevacaoComponent;
  let fixture: ComponentFixture<ElevacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElevacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElevacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
