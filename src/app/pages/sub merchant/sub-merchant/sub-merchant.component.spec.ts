import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubMerchantComponent } from './sub-merchant.component';


describe('SubMerchantComponent', () => {
  let component: SubMerchantComponent;
  let fixture: ComponentFixture<SubMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubMerchantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
