import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Create } from './create';
import { RouterModule } from '@angular/router';

describe('Create', () => {
  let component: Create;
  let fixture: ComponentFixture<Create>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Create, RouterModule.forRoot([])],
      providers: [
        { provide: HttpClient, useValue: {} }, // Mock HttpClient
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Create);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
