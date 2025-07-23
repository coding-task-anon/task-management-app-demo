import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Edit } from './edit';
import { RouterModule } from '@angular/router';

describe('Edit', () => {
  let component: Edit;
  let fixture: ComponentFixture<Edit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Edit, RouterModule.forRoot([])],
      providers: [{ provide: HttpClient, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(Edit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
