import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebwalletComponent } from './webwallet.component';

describe('WebwalletComponent', () => {
  let component: WebwalletComponent;
  let fixture: ComponentFixture<WebwalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebwalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebwalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
