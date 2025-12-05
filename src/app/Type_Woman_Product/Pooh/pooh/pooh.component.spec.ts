import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoohComponent } from './pooh.component';

describe('PoohComponent', () => {
  let component: PoohComponent;
  let fixture: ComponentFixture<PoohComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoohComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoohComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
