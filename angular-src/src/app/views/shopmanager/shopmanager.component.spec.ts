import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopmanagerComponent } from './shopmanager.component';

describe('ShopmanagerComponent', () => {
  let component: ShopmanagerComponent;
  let fixture: ComponentFixture<ShopmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
