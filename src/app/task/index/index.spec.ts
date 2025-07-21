import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Index } from './index';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('Index', () => {
  let component: Index;
  let fixture: ComponentFixture<Index>;

  beforeEach(async () => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    httpClientSpy.get.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [Index, RouterModule.forRoot([])],
      providers: [
        { provide: HttpHandler, useValue: {} },
        { provide: HttpClient, httpClientSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Index);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(Index);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain(
      'Task Management App',
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
