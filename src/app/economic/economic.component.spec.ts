import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicComponent } from './economic.component';

describe('EconomicComponent', () => {
  let component: EconomicComponent;
  let fixture: ComponentFixture<EconomicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EconomicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
