import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMissionComponent } from './search-mission.component';
import { Apollo } from 'apollo-angular';

describe('SearchMissionComponent', () => {
  let component: SearchMissionComponent;
  let fixture: ComponentFixture<SearchMissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchMissionComponent],
      providers: [Apollo],
    });
    fixture = TestBed.createComponent(SearchMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
