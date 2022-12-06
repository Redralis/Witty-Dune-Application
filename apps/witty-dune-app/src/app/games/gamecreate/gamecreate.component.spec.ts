import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamecreateComponent } from './gamecreate.component';

describe('GamecreateComponent', () => {
  let component: GamecreateComponent;
  let fixture: ComponentFixture<GamecreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamecreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GamecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
