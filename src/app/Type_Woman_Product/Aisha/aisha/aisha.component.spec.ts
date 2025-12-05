import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AishaComponent } from './aisha.component';

describe('AishaComponent', () => {
  let component: AishaComponent;
  let fixture: ComponentFixture<AishaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AishaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AishaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
