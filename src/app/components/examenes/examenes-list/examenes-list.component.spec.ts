import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesListComponent } from './examenes-list.component';

describe('ExamenesListComponent', () => {
  let component: ExamenesListComponent;
  let fixture: ComponentFixture<ExamenesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
