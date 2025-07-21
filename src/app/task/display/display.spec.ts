import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Display } from './display';
import { RouterModule } from '@angular/router';

describe('Display', () => {
  let component: Display;
  let fixture: ComponentFixture<Display>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Display, RouterModule.forRoot([])],
      providers: [
        { provide: HttpClient, useValue: {} }, // Mock HttpClient
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Display);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
