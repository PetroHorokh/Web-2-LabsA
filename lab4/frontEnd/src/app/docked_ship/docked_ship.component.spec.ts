import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Docked_shipComponent } from './docked_ship.component';

describe('Docked_shipComponent', () => {
  let component: Docked_shipComponent;
  let fixture: ComponentFixture<Docked_shipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Docked_shipComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Docked_shipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
