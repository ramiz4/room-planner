import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonFeedbackDirective } from './button-feedback.directive';

@Component({
  template: `<button appButtonFeedback>Click</button>`,
  standalone: true,
  imports: [ButtonFeedbackDirective],
})
class TestHostComponent {}

describe('ButtonFeedbackDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should trigger navigator.vibrate when pressed', () => {
    const nav = navigator as Navigator & { vibrate: jasmine.Spy };
    nav.vibrate = jasmine.createSpy('vibrate');
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('mousedown', {});
    expect(nav.vibrate).toHaveBeenCalled();
  });
});
