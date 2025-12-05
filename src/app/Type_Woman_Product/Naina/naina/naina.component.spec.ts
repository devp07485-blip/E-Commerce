import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NainaComponent } from './naina.component';

describe('NainaComponent', () => {
  let component: NainaComponent;
  let fixture: ComponentFixture<NainaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NainaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NainaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
