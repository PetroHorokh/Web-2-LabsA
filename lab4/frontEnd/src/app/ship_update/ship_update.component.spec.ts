import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ship_updateComponent } from './ship_update.component';

describe('Ship_updateComponent', () => {
  let component: Ship_updateComponent;
  let fixture: ComponentFixture<Ship_updateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ship_updateComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Ship_updateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
