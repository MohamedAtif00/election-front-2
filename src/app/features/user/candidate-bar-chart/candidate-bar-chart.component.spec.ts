import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateBarChartComponent } from './candidate-bar-chart.component';

describe('CandidateBarChartComponent', () => {
  let component: CandidateBarChartComponent;
  let fixture: ComponentFixture<CandidateBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateBarChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidateBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
