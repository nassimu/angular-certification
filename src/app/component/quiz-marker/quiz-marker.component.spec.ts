import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMarkerComponent } from './quiz-marker.component';

describe('QuizMarkerComponent', () => {
  let component: QuizMarkerComponent;
  let fixture: ComponentFixture<QuizMarkerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizMarkerComponent]
    });
    fixture = TestBed.createComponent(QuizMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
