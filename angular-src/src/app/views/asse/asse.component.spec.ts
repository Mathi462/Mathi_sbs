import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsseComponent } from './asse.component';

describe('AsseComponent', () => {
  let component: AsseComponent;
  let fixture: ComponentFixture<AsseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
