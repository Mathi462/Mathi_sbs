import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelpdComponent } from './modelpd.component';

describe('ModelpdComponent', () => {
  let component: ModelpdComponent;
  let fixture: ComponentFixture<ModelpdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelpdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
