import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterStartComponent } from './after-start.component';

describe('AfterStartComponent', () => {
  let component: AfterStartComponent;
  let fixture: ComponentFixture<AfterStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
