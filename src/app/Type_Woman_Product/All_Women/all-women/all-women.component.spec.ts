import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWomenComponent } from './all-women.component';

describe('AllWomenComponent', () => {
  let component: AllWomenComponent;
  let fixture: ComponentFixture<AllWomenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllWomenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllWomenComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
