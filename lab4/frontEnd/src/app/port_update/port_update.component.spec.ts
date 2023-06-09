import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Port_updateComponent } from './port_update.component';

describe('Ship_updateComponent', () => {
  let component: Port_updateComponent;
  let fixture: ComponentFixture<Port_updateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Port_updateComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Port_updateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
