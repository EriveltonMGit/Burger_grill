import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content3Component } from './content-3.component';

describe('Content3Component', () => {
  let component: Content3Component;
  let fixture: ComponentFixture<Content3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Content3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Content3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
