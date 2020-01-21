import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmarracaoComponent } from './amarracao.component';

describe('AmarracaoComponent', () => {
  let component: AmarracaoComponent;
  let fixture: ComponentFixture<AmarracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmarracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmarracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
