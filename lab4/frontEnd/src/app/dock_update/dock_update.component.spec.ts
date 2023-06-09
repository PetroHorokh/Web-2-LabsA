import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dock_updateComponent } from './dock_update.component';

describe('Dock_updateComponent', () => {
  let component: Dock_updateComponent;
  let fixture: ComponentFixture<Dock_updateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dock_updateComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Dock_updateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
