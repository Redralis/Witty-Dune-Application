import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamedetailsComponent } from './gamedetails.component';

describe('GamedetailsComponent', () => {
  let component: GamedetailsComponent;
  let fixture: ComponentFixture<GamedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamedetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GamedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
