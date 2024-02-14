import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessComponent } from './chess.component';
import { Apollo } from 'apollo-angular';

describe('ChessComponent', () => {
  let component: ChessComponent;
  let fixture: ComponentFixture<ChessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChessComponent],
      providers: [Apollo],
    });
    fixture = TestBed.createComponent(ChessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
