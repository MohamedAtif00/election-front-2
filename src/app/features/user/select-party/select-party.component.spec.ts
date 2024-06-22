import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPartyComponent } from './select-party.component';

describe('SelectPartyComponent', () => {
  let component: SelectPartyComponent;
  let fixture: ComponentFixture<SelectPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectPartyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
