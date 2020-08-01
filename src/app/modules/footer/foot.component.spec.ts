import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer } from './foot.component';

describe('FooterComponent', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Footer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
