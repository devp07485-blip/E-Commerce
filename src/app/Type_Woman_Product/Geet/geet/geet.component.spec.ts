import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeetComponent } from './geet.component';

describe('GeetComponent', () => {
  let component: GeetComponent;
  let fixture: ComponentFixture<GeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
