import { DOCUMENT } from '@angular/common';
import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

class MockDocument {
  constructor() {
    const loader = document.createElement('div');
    loader.setAttribute('id', 'loader');
    document.body.appendChild(loader);
    return document;
  }
}

describe('AppComponent', () => {
  let renderer2: Renderer2;
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        Renderer2,
        {
          provide: DOCUMENT, useClass: MockDocument,
        },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Slideshow App'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Slideshow App');
  });

  it(`global loader should be hidden`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(document.getElementById('loader')?.style.display).toBe('none');
  });

});
