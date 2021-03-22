import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons';

import { ScreenFormComponent } from './screen-form.component';

describe('ScreenFormComponent', () => {
  let component: ScreenFormComponent;
  let fixture: ComponentFixture<ScreenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScreenFormComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, Angular2PromiseButtonModule.forRoot({
        spinnerTpl: '<span class="lds-dual-ring"></span>',
        disableBtn: true,
        btnLoadingClass: 'is-loading',
        handleCurrentBtnOnly: false,
      })],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render screen form', () => {
    const fixture = TestBed.createComponent(ScreenFormComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.form-centered').textContent).toContain('Enter your screen key');
  });

  it('expect error on empty input', () => {
    const fixture = TestBed.createComponent(ScreenFormComponent);
    fixture.componentRef.instance.play();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.text-error').textContent).toContain('Please enter a screen key.');
  });
});
