import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreLingadoComponent } from './pre-lingado.component';

describe('PreLingadoComponent', () => {
  let component: PreLingadoComponent;
  let fixture: ComponentFixture<PreLingadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreLingadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreLingadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
