import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content4Component } from './content-4.component';

describe('Content4Component', () => {
  let component: Content4Component;
  let fixture: ComponentFixture<Content4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Content4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Content4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
