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

  it('should trigger navigator.vibrate when clicked with trusted event', () => {
    const nav = navigator as Navigator & { vibrate: jasmine.Spy };
    nav.vibrate = jasmine.createSpy('vibrate');
    const button = fixture.debugElement.query(By.css('button'));
    const directive = button.injector.get(ButtonFeedbackDirective);

    // Spy on the isUserGesture method to return true
    spyOn(directive, 'isUserGesture').and.returnValue(true);

    const clickEvent = new Event('click');
    button.triggerEventHandler('click', clickEvent);
    expect(nav.vibrate).toHaveBeenCalledWith(10);
  });

  it('should not trigger navigator.vibrate when clicked with untrusted event', () => {
    const nav = navigator as Navigator & { vibrate: jasmine.Spy };
    nav.vibrate = jasmine.createSpy('vibrate');
    const button = fixture.debugElement.query(By.css('button'));
    const directive = button.injector.get(ButtonFeedbackDirective);

    // Spy on the isUserGesture method to return false
    spyOn(directive, 'isUserGesture').and.returnValue(false);

    const clickEvent = new Event('click');
    button.triggerEventHandler('click', clickEvent);
    expect(nav.vibrate).not.toHaveBeenCalled();
  });
});
