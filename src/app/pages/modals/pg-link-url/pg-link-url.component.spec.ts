import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgLinkUrlComponent } from './pg-link-url.component';

describe('PgLinkUrlComponent', () => {
  let component: PgLinkUrlComponent;
  let fixture: ComponentFixture<PgLinkUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgLinkUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgLinkUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
