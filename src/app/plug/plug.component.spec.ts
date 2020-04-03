import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlugComponent } from './plug.component';

describe('PlugComponent', () => {
  let component: PlugComponent;
  let fixture: ComponentFixture<PlugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
