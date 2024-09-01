import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content2Component } from './content-2.component';

describe('Content2Component', () => {
  let component: Content2Component;
  let fixture: ComponentFixture<Content2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Content2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Content2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
