import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicQRComponent } from './dynamic_qr.component';

describe('MerchantComponent', () => {
  let component: DynamicQRComponent;
  let fixture: ComponentFixture<DynamicQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicQRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
