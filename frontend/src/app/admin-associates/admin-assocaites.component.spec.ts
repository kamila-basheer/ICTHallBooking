import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssocaitesComponent } from './admin-assocaites.component';

describe('AdminAssocaitesComponent', () => {
  let component: AdminAssocaitesComponent;
  let fixture: ComponentFixture<AdminAssocaitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssocaitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssocaitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
