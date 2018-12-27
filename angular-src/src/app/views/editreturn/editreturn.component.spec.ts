import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditreturnComponent } from './editreturn.component';

describe('EditreturnComponent', () => {
  let component: EditreturnComponent;
  let fixture: ComponentFixture<EditreturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditreturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditreturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
