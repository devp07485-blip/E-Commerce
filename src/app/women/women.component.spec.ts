import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenComponent } from './women.component';

describe('WomenComponent', () => {
  let component: WomenComponent;
  let fixture: ComponentFixture<WomenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WomenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomenComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
