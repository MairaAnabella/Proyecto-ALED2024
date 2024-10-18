import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProfesoresComponent } from './dialog-profesores.component';

describe('DialogProfesoresComponent', () => {
  let component: DialogProfesoresComponent;
  let fixture: ComponentFixture<DialogProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProfesoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
