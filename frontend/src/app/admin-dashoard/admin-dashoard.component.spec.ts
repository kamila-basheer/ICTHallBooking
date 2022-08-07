import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashoardComponent } from './admin-dashoard.component';

describe('AdminDashoardComponent', () => {
  let component: AdminDashoardComponent;
  let fixture: ComponentFixture<AdminDashoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
