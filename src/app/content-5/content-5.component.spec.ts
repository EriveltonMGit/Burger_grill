import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content5Component } from './content-5.component';

describe('Content5Component', () => {
  let component: Content5Component;
  let fixture: ComponentFixture<Content5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Content5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Content5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
